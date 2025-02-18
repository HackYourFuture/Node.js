import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  res.send(req.body.cityName);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});