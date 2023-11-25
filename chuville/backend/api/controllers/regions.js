import { db } from "../db.js"

export const getRegions = (_, res) => {
    const q = "SELECT * FROM region"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}