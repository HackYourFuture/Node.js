import express from "express";
const app = express();
const port = 3000;

app
  .get("/", (req, res) => {
    res.send("Hello from backend to frontend");
  })
  .listen(port, () => {
    console.log(`Server is listening to port ${port}`);
  });

app.use(express.json());
app.post("/weather", (req, res) => {
  const weather = {
    cityName: req.body.cityName,
  };
  res.json(weather);
});
