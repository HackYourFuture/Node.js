import express from "express";

const app = express();

app.use(express.json());

app.post("/weather", (req, res) => {
  let { cityName } = req.body;
  if (!cityName) {
    return res.status(400).send("You need to provide a city name");
  }
  return res.status(200).send(cityName);
});

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
