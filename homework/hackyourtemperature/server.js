import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      throw new Error("City name is missing");
    }

    res.send(`You entered: ${cityName}`);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
