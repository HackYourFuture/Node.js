const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/", function (req, res) {
 
  const { title, content } = req.body;
  const filePath = path.join(__dirname, `${title}.txt`);
  try {
    fs.readFileSync(filePath, content);
    res.send("ok");
  } catch (error) {
    res.status(500);
    res.send("Error writing showing file");
  }
});

app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const { title, content } = req.body;
  const filePath = path.join(__dirname, `${title}.txt`);
  try {
    fs.writeFileSync(filePath, content);
    res.send("ok");
  } catch (error) {
    res.status(500);
    res.send("Error writing file");
  }
});
app.put("/posts/:title", (req, res) => {
  // How to get the title and content from the request?
  // What if the request does not have a title and/or content?
  const { title } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).send('Content is required');
}
  const filePath = path.join(__dirname, `${title}.txt`);

  if (fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, content);
      res.send("ok");
    } catch (error) {
      console.error("Error writing file:", error);
      res.status(500).send("Error writing file");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
  //URL: http://localhost:3000/posts/My first blog postman testing url
});
app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const { title } = req.params;
    const filePath = path.join(__dirname, `${title}.txt`);

    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            res.send("ok");
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).send("Error deleting file");
        }
    } else {
        res.status(404).send('This post does not exist!');
    }
})





app.listen(3000);
console.log("running on 3000");
