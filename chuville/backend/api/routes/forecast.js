import express from "express";
import { getPredictions, getForecasts, deleteForecast, insertForecast, updateForecast } from "../controllers/forecast.js";

const router = express.Router();

router.get("/", getPredictions);

router.get("/forecasts", getForecasts);

router.delete("/", deleteForecast)

router.post("/", insertForecast)

router.put("/", updateForecast)

export default router;