// app.js
// Purpose: Express application for HackYourTemperature API (Weeks 1 & 2 requirements)
// - Loads express, express-handlebars (templating engine), and node-fetch
// - Exposes GET / and POST /weather endpoints
// - Exported app is used by server.js and tests

import express from "express"; // Web framework
import { engine } from "express-handlebars"; // Templating engine (Week 1: load module)
import fetch from "node-fetch"; // HTTP client for backend -> external API (Week 2)
import keys from "./sources/keys.js"; // Contains OpenWeather API key (Week 2)

const app = express();

// Enable parsing of JSON request bodies (Week 1: express.json())
app.use(express.json());

// Configure Handlebars view engine (Week 1: load and set up express-handlebars)
// Note: We configure the engine to satisfy the requirement; routes may still send plain text/JSON
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// GET / (Week 1): Respond with a simple message
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// POST /weather (Week 2): Accepts JSON body { cityName } and returns weather text
app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  // Validate input: cityName is required
  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required" });
  }

  try {
    // Call OpenWeather API with metric units
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    // If city is not found (API may return cod as string or message)
    if (data.cod === "404" || data.message === "city not found") {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    // Success: respond with temperature in °C
    const temperature = data.main.temp;
    res.json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C`
    });
  } catch (error) {
    // Generic server error (e.g., network issues)
    console.error(error);
    res.status(500).json({ weatherText: "Something went wrong!" });
  }
});

export default app;
