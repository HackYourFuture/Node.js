import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();
app.use(express.json());

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required!" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    if (response.ok) {
      res.json({
        weatherText: `The temperature in ${cityName} is ${data.main.temp}°C.`,
      });
    } else {
      res.status(404).json({ weatherText: "City is not found!" });
    }
  } catch (error) {
    res.status(500).json({ weatherText: "An error occurred while fetching data." });
  }
});

export default app;
Step 3: Update the server.js File
Split the server setup into app.js and server.js:

server.js should only start the server.
server.js:

javascript
Copy code
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.js:

javascript
Copy code
import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();
app.use(express.json());

// Add routes here (e.g., GET `/` and POST `/weather`)
export default app;