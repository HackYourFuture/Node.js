// app.js
import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

const app = express();
app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// POST /weather
app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  // 1️⃣ Validate input
  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required" });
  }

  try {
    // 2️⃣ Fetch data from OpenWeather
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    // 3️⃣ Handle city not found
    if (data.cod === "404" || data.message === "city not found") {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    // 4️⃣ Send temperature
    const temperature = data.main.temp;
    res.json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ weatherText: "Something went wrong!" });
  }
});

export default app;
