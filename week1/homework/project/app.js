
const express = require("express");
const expressHandlebars = require("express-handlebars");
const axios = require("axios");

const app = express();
const port = process.env.port ||3000;

app.get("/", (req, res) => res.send("Hello from backend to frontend!"));
app.listen(port, () => console.log(`The port started at ${port}`));