import express from "express";
import handlebars from "express-handlebars"; // Updated import
import fetch from "node-fetch"; // Renamed for clarity
const port = process.env.PORT || 8000;

const app = express();

// ✅ Middleware MUST come before routes
app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
  res.type("html"); // Express shortcut for setting Content-Type
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
