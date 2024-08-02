const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Member = require("../models/member");
const Book = require("../models/book");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Member.deleteMany({});
  await Book.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Member Controller", () => {
  it("should add a new member", async () => {
    const res = await request(app)
      .post("/api/members")
      .send({
        code: "M001",
        name: "Angga",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("code", "M001");
    expect(res.body).toHaveProperty("name", "Angga");
  });

  it("should borrow a book", async () => {
    const book = await new Book({
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1,
    }).save();

    const member = await new Member({
      code: "M001",
      name: "Angga",
    }).save();

    const res = await request(app)
      .post("/api/members/borrow")
      .send({
        memberCode: member.code,
        bookCode: book.code,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Book borrowed successfully");

    const updatedBook = await Book.findOne({ code: book.code });
    expect(updatedBook.borrowedBy).toBe(member.code);

    const updatedMember = await Member.findOne({ code: member.code });
    expect(updatedMember.borrowedBooksCount).toBe(1);
  });

  it("should return a borrowed book", async () => {
    const book = await new Book({
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 0, // initially borrowed
      borrowedBy: "M001",
    }).save();

    const member = await new Member({
      code: "M001",
      name: "Angga",
      borrowedBooks: [{ bookCode: book.code, borrowDate: new Date() }],
      borrowedBooksCount: 1,
    }).save();

    const res = await request(app)
      .post("/api/members/return")
      .send({
        memberCode: member.code,
        bookCode: book.code,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Book returned successfully");

    const updatedBook = await Book.findOne({ code: book.code });
    expect(updatedBook.borrowedBy).toBeNull();
    expect(updatedBook.stock).toBe(1);

    const updatedMember = await Member.findOne({ code: member.code });
    expect(updatedMember.borrowedBooksCount).toBe(0);
  });
});
