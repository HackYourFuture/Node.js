//modules we had to get from NPM
const express = require("express");
const exphbs = require("express-handlebars");
const axios = require("axios");

//modules I might need next week
//fs = file system!!!
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//express server
app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.listen(PORT);
