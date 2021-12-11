const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const snippetRoutes = require("./routes/snippets");
const categoryRoutes = require("./routes/category");
const port = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});
app.use(express.json());
app.use(cors());
app.use("/snippet", snippetRoutes);
app.use("/category", categoryRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
