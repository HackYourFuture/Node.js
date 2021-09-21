import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// POST method route
app.post("/weather", (req, res) => {
  res.send(`City Name : ${req.body.cityName}`);
});
app.listen(3000);
