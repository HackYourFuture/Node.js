import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Hello from backend to frontend!</h1>');
});

app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  
  if (!cityName) {
    res.end(`Please enter a valid city name`);
  } else {
    res.end(`The city name you entered is: ${cityName}`);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));