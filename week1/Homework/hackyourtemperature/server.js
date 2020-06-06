const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine("handlebars", exphbs({
  defaultLayout: false
}));

app.set("view engine", 'handlebars');

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`The city name is ${cityName}`)
});

app.get('/', (req, res) => {
  res.render('main')
});

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.listen(PORT, () => {
  console.log(`we are listening on port ${PORT}`)
});