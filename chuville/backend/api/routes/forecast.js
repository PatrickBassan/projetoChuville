import express from "express";
import { getPredictions, getForecasts, deleteForecast } from "../controllers/forecast.js";

const router = express.Router();

router.get("/", getPredictions);

router.get("/forecasts", getForecasts);

router.delete("/", deleteForecast)

export default router;