import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send(`<form action="/weather" method="POST">
  <input type="text" name="cityName" ></input>
  <input type="submit"></input>
</form>`);
});

app.use(express.json());
app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(3000);
