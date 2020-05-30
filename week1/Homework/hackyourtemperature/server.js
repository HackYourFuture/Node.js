
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const axios = require('axios')

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});
app.listen(3000);
// console.log('ff')  