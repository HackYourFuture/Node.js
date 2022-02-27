import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", (req, res) => {
  let cityName = req.body.city;
  res.send(cityName);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
