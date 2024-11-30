const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", function (_, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  try {
    fs.writeFileSync(`${title}.txt`, content);
    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the blog post");
  }
});

app.put("/posts/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).send("Content is required");
  }

  const filePath = `${title}.txt`;

  if (fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, content);
      res.send("ok");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the blog post");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const filePath = `${title}.txt`;

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      res.send("ok");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while deleting the blog post");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const filePath = `${title}.txt`;

  if (fs.existsSync(filePath)) {
    try {
      const postContent = fs.readFileSync(filePath, "utf8");
      res.send(postContent);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while reading the blog post");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

const PORT = 3000;
app
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error(err);
    }
  });
