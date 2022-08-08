import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello from backend to frontend!</h1>");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).json({ message: "Opp Please enter Valid city name " });
  }
  res.status(200).json({ cityName });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
