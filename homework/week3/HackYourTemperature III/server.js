// require
const express = require('express')
const app = express()
const axios = require("axios");
const APIKEY = require('./sources/keys.json').api_key;
const exphbs = require('express-handlebars');

app.use(express.json());

// set up the handlebars engine 
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index');
});


app.post('/weather', (req, res) => {

    const cityName = req.body.cityName;
    const urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`;

    // fetch data via axios
    axios.get(urlWeather)
        .then(function(response) {
            return response.data;
        }).then(data => {
            const { main, name } = data;
            const cityName = name;
            const temp = main.temp;
            res.render('index', { weatherTxt: `the temp in ${cityName} is ${temp} ` });

        })
        .catch(error => res.render('index', { weatherTxt: `oops there is ${error} Sorry` }));

});

app.listen(3000, () => console.log('listen to port'));