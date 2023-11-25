import { db } from "../db.js"

export const getPredictions = (req, res) => {
    const cdregion = req.query.cdregion
    const period = req.query.time
    const dtstart = req.query.dtstart

    const q = "SELECT * FROM forecast INNER JOIN region ON (region.cdregion =  forecast.cdregion) WHERE forecast.cdregion = ? AND forecast.fgperiod = ? AND forecast.dtstart = ?"
    db.query(q, [cdregion, period, dtstart], (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const getForecasts = (req, res) => {
    const dtstart = req.query.dtstart
    
    const q = "SELECT * FROM forecast INNER JOIN region ON (region.cdregion = forecast.cdregion) WHERE forecast.dtstart > ?"
    db.query(q, [dtstart], (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const deleteForecast = (req, res) => {
    const q = "DELETE FROM forecast WHERE `cdforecast` = ?"

    db.query(q, [req.query.cd], (err) => {
      if (err) return res.json(err)
  
      return res.status(200).json("Previsão deletada com sucesso.")
    })
}

export const insertForecast = (req, res) => {
    const q = "INSERT INTO forecast (probability, dtstart, fgperiod, cdregion) VALUES (?,?,?,?)"
    db.query(q, [req.body.probability, req.body.dtstart, req.body.period, req.body.cdregion], (err) => {
      if (err) return res.json(err)
  
      return res.status(200).json("Previsão inserida com sucesso.")
    })
}

export const updateForecast = (req, res) => {
    const q = "UPDATE forecast SET `probability` = ?, `dtstart` = ?, `fgperiod` = ?, `cdregion` = ? WHERE `cdforecast` = ?"
    db.query(q, [req.body.probability, req.body.dtstart, req.body.period, req.body.cdregion, req.body.cdforecast], (err) => {
      if (err) return res.json(err)
  
      return res.status(200).json("Previsão atualizada com sucesso.")
    })
}