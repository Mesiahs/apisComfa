import { pool } from "../db.js";

export const getCierres = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM cierre_caja");
  res.json(rows);
};

export const createCierre = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO cierre_caja
       (fecha, total_efectivo, total_tarjeta, total_transferencia, total_general)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.fecha,
        data.total_efectivo,
        data.total_tarjeta,
        data.total_transferencia,
        data.total_general
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
