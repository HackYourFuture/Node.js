const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

//GET ALL
function getBlogs(req, res) {}  // I couldn't find the right way to list all the blogs
// I tried readdir etc. but didn't work:(

//GET ONE
function getOneBlog(req, res) {
  // How to get the tilte from the url parameters?
  const title = req.params.title;
  if (fs.existsSync(title)) {
    res.sendFile(path.join(__dirname, title));
  } else {
    res.statusCode = 404;
    res.end("Blog Post Does Not Exist");
  }
}

//CREATE POST
function createBlog(req, res) {
  if (isValid) {
    const title = req.body.title;
    const content = req.body.content;
    fs.writeFileSync(title, content);
    res.end("OK");
  } else {
    res.status(400);
    res.end("You need to add a valid title and content");
  }
}

//UPDATE POST
function updateBlog(req, res) {
  const title = req.params.title;
  const content = req.params.content;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("OK");
  } else {
    res.status(404);
    res.end("Blog Post Does Not Exist");
  }
}

//DELETE POST
function deleteBlog(req, res) {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("OK");
  } else {
    res.status(404);
    res.end("Blog Post Does Not Exist");
  }
}

//CHECK VALIDITY
function isValid(req) {
  if (
    typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.content == "undefined"
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getBlogs,
  getOneBlog,
  createBlog,
  deleteBlog,
  updateBlog
};
