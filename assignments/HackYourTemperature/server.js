import express from 'express';


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hallo from backend to frontend!")
});

app.post("/weather", (req, res) => {
    const cityName = req.body.cityName;
    res.send(`The city name is: ${cityName}`)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
