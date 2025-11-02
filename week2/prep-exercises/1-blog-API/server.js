const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Folder where all blogs will be stored
const BLOGS_DIR = path.join(__dirname, "blogs");

// Make sure the folder exists
if (!fs.existsSync(BLOGS_DIR)) {
  fs.mkdirSync(BLOGS_DIR);
}

// Create a new blog post
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required!");
  }

  const filePath = path.join(BLOGS_DIR, title);

  if (fs.existsSync(filePath)) {
    return res.status(400).send("Post already exists!");
  }

  fs.writeFileSync(filePath, content);
  res.status(201).send("ok");
});

// Read a single blog post
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const filePath = path.join(BLOGS_DIR, title);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }

  const content = fs.readFileSync(filePath, "utf8");
  res.status(200).send(content);
});

// Read all posts (titles only)
app.get("/blogs", (req, res) => {
  const files = fs.readdirSync(BLOGS_DIR);
  const titles = files.map((file) => ({ title: file }));
  res.status(200).json(titles);
});

//  Update an existing post
app.put("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  const filePath = path.join(BLOGS_DIR, title);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }

  if (!content) {
    return res.status(400).send("Content is required!");
  }

  fs.writeFileSync(filePath, content);
  res.status(200).send("ok");
});

//  Delete a post
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const filePath = path.join(BLOGS_DIR, title);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }

  fs.unlinkSync(filePath);
  res.status(200).send("ok");
});

// Default root
app.get("/", (req, res) => {
  res.send("Hello World - Blog API running");
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
