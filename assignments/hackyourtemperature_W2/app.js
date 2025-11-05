import express from "express";
import keys from "./sources/keys.js";

const app = express();
app.use(express.json());

// Проверка работы сервера === test route
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// Получение погоды по названию города ===  get weather by city name
app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  // Если город не указан === if city is not provided
  if (!cityName) {
    return res.status(400).json({ weatherText: "cityName is required" });
  }

  try {
    // Запрос к OpenWeather API === request to OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    // Если город не найден === if city is not found
    if (data.cod !== 200) {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    // Отправка температуры пользователю === send temperature to user
    const temperature = data.main.temp;
    res.json({ weatherText: `The temperature in ${data.name} is ${temperature}°C` });
  } catch (error) {
    // Ошибка сервера === server error
    res.status(500).json({ weatherText: "Server error!" });
  }
});

// Экспорт для тестов и сервера === export for tests and server
export default app;
