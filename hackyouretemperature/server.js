import express from "express";
import { json } from "express";
import keys from "./sources/Keys.js";
import fetch from "node-fetch";

const app = express();
app.use(json());

app.get("/", async (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const cityData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );

    if (cityData.ok) {
      const weatherData = await cityData.json();
      const temp = weatherData.main.temp;
      res
        .status(200)
        .json({ weatherText: `it is ${temp} celsius in ${cityName}` });
    } else if (cityData.status === 404) {
      res.status(404).json({ weatherText: `${cityName} City is not found!` });
    } else {
      res.status(cityData.status).json({ weatherText: "Server Error" });
    }
  } catch (error) {
    res.status(500).json({ weatherText: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port " + 3000);
});
export default app;
