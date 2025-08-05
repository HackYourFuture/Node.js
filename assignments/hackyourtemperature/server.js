import express from "express";
import handlebars from "express-handlebars";
import fetch from "node-fetch";
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json()); 

app.get("/", (req, res) => {
  res.type("html"); 
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.json({
    status: "Success",
    message: "Received city name",
    city: cityName,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* Posting with curl
 $ curl -X POST http://localhost:8000/weather   -H "Content-Type: application/json"   -d '{"cityName":"Amsterdam"}' > post_weather_response.json
 */

/*Testing using curl
 curl -X POST http://localhost:8000/weather \
 -H "Content-Type: application/json" \
 -d '{"cityName":"Amsterdam"}'
 */
