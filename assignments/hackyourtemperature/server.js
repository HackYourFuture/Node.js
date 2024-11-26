import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: "There is no city name" });
  }

  res.status(200).json({ message: "Form input received", cityName });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
