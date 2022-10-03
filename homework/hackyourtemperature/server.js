import express from "express";
const app = express();
app.use(express.json())
app.get("/", (req, res) => {
    res.setHeader('Content-Type', "text/plain")
    res.send('hello from backend to frontend!')
})
app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;
    res.setHeader('Content-Type', "text/plain")
    res.send('cityName')
})
app.listen(3000, () => {
    console.log('Running..');
})