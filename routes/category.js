const express = require("express");
const Category = require("../models/Categories");
const Snippets = require("../models/Snippets");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { category, parent } = req.body;
    if (!category || !parent) throw new Error("Required fields are empty");
    const newCategory = new Category({ category, parent });
    await newCategory.save();
    res.status(200).send("Category Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/list", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) throw new Error("Id can't be null");
    const questions = await Snippets.find({ categoryId: categoryId }).limit(
      100
    );
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
