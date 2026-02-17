import { pool } from "../db.js";

export const getReservacionDetalles = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM reservacion_detalles");
  res.json(rows);
};

export const getReservacionDetalle = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM reservacion_detalles WHERE id_detalles = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Detalle not found" });
  }

  res.json(rows[0]);
};

export const createReservacionDetalle = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO reservacion_detalles
       (id_reservacion, id_infrastructuras, tarifa_plena, descuento_porcentaje, tarifa_final)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.id_reservacion,
        data.id_infrastructuras,
        data.tarifa_plena,
        data.descuento_porcentaje,
        data.tarifa_final
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
