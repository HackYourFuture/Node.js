import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
    const { cityName } = req.body;
    res.send(`City name received: ${cityName}`);
});

app.listen(3000)
console.log("first server running on port 3000")