import express from "express";
import path from "path";
import expressHandlebars from "express-handlebars";
import { fileURLToPath } from "url";
import { router } from "./Router/weather.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// Handelbars setup
app.engine("hbs", expressHandlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => {
  console.log(`server is running on prot ${PORT}`);
});
