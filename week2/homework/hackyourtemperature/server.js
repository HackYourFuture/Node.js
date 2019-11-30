const express = require("express");
const app = express();
const hbs = require("express-handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "handlebars");
app.engine("handlebars", hbs({ defaultLayout: "layout" }));

app.use(express.static("static"));

app.get("/", function(req, res) {
  res.render("form");
});

app.post("/app", (req, res) => {
  res.send({ cityName: req.body.cityName });
});

app.listen(8000, () => {
  console.log("Server started");
});
