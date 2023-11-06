import { db } from "../db.js";

export const getPredictions = (req, res) => {
    const cdregion = req.query.cdregion;
    const period = req.query.time;
    const dtstart = req.query.dtstart;

    const q = "SELECT * FROM forecast INNER JOIN region ON (region.cdregion =  forecast.cdregion) WHERE forecast.cdregion = ? AND forecast.fgperiod = ?";
    db.query(q, [cdregion, period], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getForecasts = (req, res) => {
    const q = "SELECT * FROM forecast INNER JOIN region ON (region.cdregion =  forecast.cdregion)";
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const deleteForecast = (req, res) => {
    const q = "DELETE FROM forecast WHERE `cdforecast` = ?";

    db.query(q, [req.query.cd], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Previsão deletada com sucesso.");
    });
  };