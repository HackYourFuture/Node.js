import express from "express";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    return res.status(400).send("City name is required");
  }

  res.send(`You entered: ${cityName}`);
});

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(400)
      .send(
        "An error occurred while processing the data. Please check the entered data and try again"
      );
  }
  next();
});

app.listen(PORT, () =>
  console.log(`Server is  running on http://localhost:${PORT}`)
);
