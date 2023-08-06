import express from 'express';
const app = express();
app.use(express.json());
app.get('/', function (req, res) {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  res.send(cityName);
});
app.listen(3010);

