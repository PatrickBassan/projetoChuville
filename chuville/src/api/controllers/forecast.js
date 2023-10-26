import { db } from "../db.js";

export const getPredictions = (_, res) => {
    const q = "SELECT * FROM forecast";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};