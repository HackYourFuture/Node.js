import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from backend to frontend');
});
  
app.post('/weather' , (req, res) => {
    const { cityName } = req.body
    res.json({ message : `weather data received for ${cityName}`});
});

app.listen(PORT , () => {
    console.log(`Server is runnig on port ${PORT}`);
});