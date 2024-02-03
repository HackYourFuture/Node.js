import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
    const { cityName } = req.body;

    if (!cityName || cityName.trim() === '') {
        res.status(400).send(`City Name is required`);

    }
    res.send(`You entered : ${cityName}`);
});


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

