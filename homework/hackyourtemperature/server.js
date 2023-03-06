import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

const port = 3000;
app.listen(port, console.log(`app listening to http://localhost:${port}`));
