import express from "express";
import fetch from "node-fetch";
import { engine } from 'express-handlebars';
import key from "./sources/keys.js";

const app = express();
app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine({
    defaultLayout: null
}));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
    res.render("index")
})
app.post('/weather', async (req, res) => {
    const cityName = req.body.cityName;
    const apiKey = key.Api_Key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(URL)
    const data = await response.json()

    if (!data.name) {
        return res.status(400 ).render("index", {
            weatherText: "City is not found!"
        });
    }
    res.render("index", {
        weatherText: `The temperature in ${data.name} is ${Math.floor(data.main.temp)} °C.`
    });
})

export default app;