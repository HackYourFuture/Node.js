const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', { layout: false });
});
app.post('/weather', async function(req, res) {
	try {
		const cityName = req.body.cityName;
		const APIKEY = require('./sources/secrets.json').API_KEY;
		const obj = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKEY}`); // get full data of inserted city
		const temp = (obj.data.main.temp - 273.15).toFixed(2); // convert kelvin to celsius, I can get more like mintemp/maxtemp/wind!
		const weatherText = `The temperature in ${cityName} is ${temp} °C!`;
		res.render('index', { layout: false, weatherText });
	} catch (error) {
		const weatherText = require('./sources/secrets.json').notFound;
		res.render('index', { layout: false, weatherText });
	}
});

app.listen(port, () => {
	console.log(`starting at port`, port);
});
