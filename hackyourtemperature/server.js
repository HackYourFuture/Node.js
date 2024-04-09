import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.use(express.json());


app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ error: "CityName is required" });
  }
  res.send(`You entered: ${cityName}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});