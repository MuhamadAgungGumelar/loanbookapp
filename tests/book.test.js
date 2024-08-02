const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Book = require("../models/book");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Book.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Book Controller", () => {
  it("should add a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("code", "JK-45");
    expect(res.body).toHaveProperty("title", "Harry Potter");
  });

  it("should retrieve all available books", async () => {
    await new Book({
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1,
    }).save();

    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("code", "JK-45");
  });
});
