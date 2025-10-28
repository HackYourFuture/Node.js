// server.js

// Import necessary packages (using ES modules)
import express from "express";
import fetch from "node-fetch"; // not used yet, but needed later
import { engine } from "express-handlebars";

// Create an Express application
const app = express();

// Middlewares
app.use(express.json()); // allows Express to read JSON in POST requests

// Optional: set up handlebars for later weeks
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// GET route (homepage)
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

// POST route
app.post("/weather", (req, res) => {
  // Extract cityName from the JSON body
  const { cityName } = req.body;

  // Send it back to the client
  res.json({ message: `You sent: ${cityName}` });
});

// Listen to port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
