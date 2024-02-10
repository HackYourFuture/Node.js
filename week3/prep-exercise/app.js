import express from "express";
// Use below import statement for importing middlewares from users.js for your routes
// import { ....... } from "./users.js";

let app = express();

app.use(express.json());
// Create routes here, e.g. app.post("/register", .......)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
