const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  parent: {
    type: String,
    required: true,
    trim: true,
  },
});

const Categories = mongoose.model("categorie", categorieSchema);

module.exports = Categories;
