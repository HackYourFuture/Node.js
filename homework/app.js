import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";
import { engine } from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { title: "HackYourTemperature" });
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const externalApiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=${cityName}`;
    const tempWeather = await fetch(externalApiURL).then((response) =>
      response.json()
    );
    const dataCity = tempWeather.main;
    if (!dataCity) {
      res.render("index", { cityNotFound: "City you searched is not found" });
      return;
    }

    res.render("index", {
      cityName,
      dataCity,
    });
  } catch (error) {
    console.log(error);
  }
});

export default app;
