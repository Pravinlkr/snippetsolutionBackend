const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answers: [String],
  categoryId: {
    type: String,
    required: true,
    trim: true,
  },
});

const Snippets = mongoose.model("snippet", snippetSchema);

module.exports = Snippets;
