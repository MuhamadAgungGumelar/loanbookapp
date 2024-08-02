const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  borrowedBooks: [
    {
      bookCode: { type: String },
      borrowDate: { type: Date }
    }
  ],
  borrowedBooksCount: { type: Number, default: 0 },
  penaltyEndDate: { type: Date, default: null },
});

module.exports = mongoose.model("Member", memberSchema);
