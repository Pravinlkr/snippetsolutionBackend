const express = require("express");
const Snippets = require("../models/Snippets");
const Category = require("../models/Categories");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const snippetId = req.params.id;
    if (!snippetId) throw new Error("Id can't be null");
    const snippet = await Snippets.findById(snippetId);
    const category = await Category.findById(snippet.categoryId);
    res.status(200).send({ snippet, category });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const questions = await Snippets.find({
      question: { $regex: search },
    }).limit(5);
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { question, answers, categoryId } = req.body;
    if (!question || !answers || !categoryId)
      throw new Error("Required fields are empty");
    const snippet = new Snippets({ question, answers, categoryId });
    await snippet.save();
    res.status(200).send("Snippet Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
