import express from "express";
export const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.post("/weather", (req, res) => {
  const { cityName } = req.body;
  res.render("home", { cityName });
});
