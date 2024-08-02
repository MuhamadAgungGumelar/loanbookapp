const Member = require("../models/member");
const Book = require("../models/book");

exports.getAllMember = async (req, res) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to borrow a book
exports.borrowBook = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  try {
    const member = await Member.findOne({ code: memberCode });
    const book = await Book.findOne({ code: bookCode });

    if (!member || !book) {
      return res.status(404).json({ error: "Member or Book not found" });
    }

    // Check conditions for borrowing
    const today = new Date();
    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({ error: "Cannot borrow more than 2 books" });
    }
    if (book.borrowedBy) {
      return res.status(400).json({ error: "Book is already borrowed" });
    }
    if (member.penaltyEndDate && member.penaltyEndDate > today) {
      return res.status(400).json({ error: "Member is under penalty" });
    }
    if (book.stock < 0){
      return res.status(400).json({ error: "Book is empthy" });
    }

    // Borrow the book
    book.borrowedBy = member.code;
    book.stock -= 1;
    await book.save();

    member.borrowedBooks.push({ bookCode: book.code, borrowDate: today });
    member.borrowedBooksCount = member.borrowedBooks.length;
    await member.save();

    res.json({
      message: "Book borrowed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to return a book
exports.returnBook = async (req, res) => {
  const { memberCode, bookCode } = req.body;

  try {
    const member = await Member.findOne({ code: memberCode });
    const book = await Book.findOne({ code: bookCode });

    if (!member || !book) {
      return res.status(404).json({ error: "Member or Book not found" });
    }

    // Find the borrowed book entry
    const borrowedBook = member.borrowedBooks.find(
      (b) => b.bookCode === book.code
    );

    if (!borrowedBook) {
      return res
        .status(400)
        .json({ error: "This book is not borrowed by the member" });
    }

    // Calculate penalty
    const today = new Date();
    const borrowDate = new Date(borrowedBook.borrowDate);
    const daysBorrowed = Math.floor(
      (today - borrowDate) / (1000 * 60 * 60 * 24)
    );

    if (daysBorrowed > 7) {
      member.penaltyEndDate = new Date(today.setDate(today.getDate() + 3));
    } else {
      member.penaltyEndDate = null;
    }

    // Return the book
    book.borrowedBy = null;
    book.stock += 1;
    await book.save();

    member.borrowedBooks = member.borrowedBooks.filter(
      (b) => b.bookCode !== book.code
    );
    member.borrowedBooksCount = member.borrowedBooks.length;
    await member.save();

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new member
exports.addMember = async (req, res) => {
  try {
    const { code, name } = req.body;
    const member = new Member({ code, name });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
