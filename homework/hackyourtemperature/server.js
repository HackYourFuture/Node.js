import express from 'express';
//import exphbs from 'express-handlebars';

/*eslint no-undef: "error"*/
/*eslint-env node*/

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.city;
  console.log(cityName);
  res.send(cityName);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
