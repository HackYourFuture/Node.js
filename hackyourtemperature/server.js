import express from 'express';
import getWeather from './controller/weather.js';
import customErrorHandler from './middlewares/customErrorHandler.js';

const app = express();

app.use(express.json());

app.post('/weather', getWeather);

app.use(customErrorHandler);

app.listen(3000, () => {
  console.log(`Server started on PORT:3000`);
});
