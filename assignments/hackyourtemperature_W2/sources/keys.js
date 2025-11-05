// sources/keys.js
import dotenv from "dotenv";
dotenv.config(); // Загружает переменные из .env === loads variables from .env

const keys = {
  API_KEY: process.env.API_KEY || "" // fallback на пустую строку === fallback to empty string
};

export default keys;
