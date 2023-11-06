import express from "express";
import regionsRoutes from "./routes/regions.js";
import forecastRoutes from "./routes/forecast.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/regions", regionsRoutes);

app.use("/forecast", forecastRoutes);

app.listen(8800);