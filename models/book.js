const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, default: 1 },
  borrowedBy: { type: String, default: null },
});

module.exports = mongoose.model("Book", bookSchema);
