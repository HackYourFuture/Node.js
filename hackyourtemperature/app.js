"use strict";
import express from 'express';
import exphbs from 'express-handlebars';
import {
    keys
} from './sources/keys.js';
import axios from 'axios';


const app = express();

//Handlebars middleware
app.engine("handlebars", exphbs({
    defaultLayout: false
}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(express.json()); //Handle json data
app.use(express.urlencoded({
    extended: false
})); //Handle form data

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', async (req, res) => {
    if (typeof req.body === "undefined" || typeof req.body.cityName === "undefined" || typeof req.body.inlineRadioOptions === "undefined") {
        res.status(400);
        res.send("Invalid request");
        return;
    }

    const cityName = req.body.cityName;
    const temperatureUnit = req.body.inlineRadioOptions;

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=${temperatureUnit}`;

    const fetch = await fetchData(endpoint);

    if (fetch.status === 200) {
        if (temperatureUnit === "standard") {
            res.render('index', {
                weatherText: `The temperature in ${cityName} is ${fetch.data.main.temp} K`
            });
        } else if (temperatureUnit === "metric") {
            res.render('index', {
                weatherText: `The temperature in ${cityName} is ${fetch.data.main.temp} °C`
            });
        } else if (temperatureUnit === "imperial") {
            res.render('index', {
                weatherText: `The temperature in ${cityName} is ${fetch.data.main.temp} °F`
            });
        }
    } else {
        res.render('index', {
            weatherText: "City is not found!"
        });
    }

});

async function fetchData(endpoint) {

    try {
        const response = await axios.get(endpoint);
        return response;
    } catch (error) {
        return error.response;
    }

}
export default app;