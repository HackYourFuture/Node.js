import express from "express";
import { json } from "express";

const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    console.log("City name is empty.");
    return res.status(400).json({ error: "City name is required." });
  }
  console.log(cityName);
  res.status(201).json({ cityName: cityName });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port " + 3000);
});
