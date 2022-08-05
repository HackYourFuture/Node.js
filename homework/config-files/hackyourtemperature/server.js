import express from 'express';
import router from './routes/weather.js';
import path from 'path';

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});
app.use('/weather', router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
