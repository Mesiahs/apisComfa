import { pool } from "../db.js";

export const getReservaciones = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM reservacion");
  res.json(rows);
};

export const getReservacion = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM reservacion WHERE id_reservacion = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Reservacion not found" });
  }

  res.json(rows[0]);
};

export const getReservacionesByUser = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM reservacion WHERE id_user = $1",
    [id]
  );

  res.json(rows);
};

export const createReservacion = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO reservacion
       (id_user, fecha_reserva, fecha_inicio, fecha_fin, estado_reserva, total)
       VALUES ($1, NOW(), $2, $3, $4, $5)
       RETURNING *`,
      [
        data.id_user,
        data.fecha_inicio,
        data.fecha_fin,
        data.estado_reserva,
        data.total
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteReservacion = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM reservacion WHERE id_reservacion = $1",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Reservacion not found" });
  }

  return res.sendStatus(204);
};

export const updateReservacion = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    `UPDATE reservacion
     SET fecha_inicio = $1,
         fecha_fin = $2,
         estado_reserva = $3,
         total = $4
     WHERE id_reservacion = $5
     RETURNING *`,
    [
      data.fecha_inicio,
      data.fecha_fin,
      data.estado_reserva,
      data.total,
      id
    ]
  );

  res.json(rows[0]);
};
