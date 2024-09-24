import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET request to /
app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

// POST request to /weather
app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.json({ cityName });
});

app.listen(PORT);
