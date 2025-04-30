import express, { json } from 'express';
import { engine } from 'express-handlebars';
const app = express();

app.use(json())

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('hello from backend to frontend!');
    res.end
});

app.post('/wether', (req, res) => {
    const cityName = req.body.cityName;
    res.statusCode = 200;
    res.end(cityName);
})

app.listen(3000);
