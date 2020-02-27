const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));

// routing express
app.get('/', (req, res) => {
	res.render('index');
});
app.post('/weather', (req, res) => {
	const cityName = req.body.cityName;
	res.render('layouts/main', { cityName });
});
app.listen(3000, () => {
	console.log('server is startingat port', 3000);
});
