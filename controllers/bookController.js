const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: null });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { code, title, author, stock } = req.body;
    const book = new Book({ code, title, author, stock });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
