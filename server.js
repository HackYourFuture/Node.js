import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
    const { cityName } = req.body;
    res.send(cityName);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});