import express from "express";
import { engine } from "express-handlebars";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
