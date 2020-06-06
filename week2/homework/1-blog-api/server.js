const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const data = require("./blogs.json");
const PORT = process.env.PORT || 3000;
app.use(express.json());
// const { uuid } = require('uuidv4');

app.delete('/blogs/:title', (req, res) => {
  const blogToDelete = data.find(blog => blog.title == req.params.title);
  const deleteBlog = data.filter(blog => blog.title == blogToDelete)
  data.splice(deleteBlog, 1);
  fs.writeFileSync("./blogs.json", JSON.stringify(data))
  res.end('ok');
});

app.post('/blogs', (req, res) => {
  if (isValid(req)) {
    res.status(400);
    res.send("invalid");
    return;
  }
  // const id = uuid();
  let newBlog = {
    // id:id,
    title: req.body.title,
    content: req.body.content
  }
  data.push(newBlog);
  res.status(201);
  fs.writeFileSync("./blogs.json", JSON.stringify(newBlog))
  res.end('ok')
});

app.put('/blogs', (req, res) => {
  if (isValid(req)) {
    res.status(400);
    res.send("invalid");
    return;
  }
  const content = req.body.content;
  const title = req.body.title;
  if (fs.existsSync("./blogs.json")) {
    fs.writeFileSync(title, content);
    res.status(200)
    res.end("This content is now updated!")
  } else {
    res.status(404);
    res.send('This post does not exist!')
  }
});

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    res.sendFile(__dirname + "/blogs.json");
  } else {
    res.status(404)
    res.end("does not exist")
  }
});

function isValid(req) {
  if (req.body == undefined ||
    req.body.title == undefined ||
    req.body.content == undefined) {
    return true
  } else {
    return false
  }
};

app.listen(PORT, () => {
  console.log(`we are listening on port ${PORT}`)
});


