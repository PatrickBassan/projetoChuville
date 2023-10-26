import express from "express";
import { getPredictions } from "../controllers/forecast.js";

const router = express.Router();

router.get("/", getPredictions);

export default router;