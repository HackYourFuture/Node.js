import express from 'express';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.write('hello from backend to frontend!');
  res.end();
});

app.post('/weather', (req, res) => {
  const city = req.body.cityName;
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
