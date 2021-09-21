import express from "express";
import exphbs from "express-handlebars";
import fetch from "node-fetch";
import bodyParser from "body-parser";

//my server
const app = express();

//set the engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//home page
app.get("/", function (req, res) {
  res.send("hello from backend to frontend!");
});

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//
app.use(express.json());

//routing
app.get("/weather", (req, res) => {
  res.render("weather", { title: "Weather Data" });
});
//handle post request from the client
app.post("/weather", urlencodedParser, (req, res) => {
  if (!req.body.cityName) {
    res.render("weather", { cityName: "City not found!" });
  }
  res.render("weather", { cityName: req.body.cityName });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is running!!!!");
});
