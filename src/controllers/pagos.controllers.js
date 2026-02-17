import { pool } from "../db.js";

export const getPagos = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM pago");
  res.json(rows);
};

export const getPago = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM pago WHERE id_pago = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Pago not found" });
  }

  res.json(rows[0]);
};

export const createPago = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO pago
       (id_reservacion, fecha_pago, valor_pagado, medio_pago, punto_pago)
       VALUES ($1, NOW(), $2, $3, $4)
       RETURNING *`,
      [
        data.id_reservacion,
        data.valor_pagado,
        data.medio_pago,
        data.punto_pago
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
