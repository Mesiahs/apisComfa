import { pool } from "../db.js";

export const getCentros = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM centros_recreacion");
  res.json(rows);
};

export const getCentro = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM centros_recreacion WHERE id_centro = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Centro not found" });
  }

  res.json(rows[0]);
};

export const createCentro = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO centros_recreacion (nombre, ciudad, direccion, estado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.nombre, data.ciudad, data.direccion, data.estado]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteCentro = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM centros_recreacion WHERE id_centro = $1",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Centro not found" });
  }

  return res.sendStatus(204);
};

export const updateCentro = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    `UPDATE centros_recreacion
     SET nombre = $1, ciudad = $2, direccion = $3, estado = $4
     WHERE id_centro = $5
     RETURNING *`,
    [data.nombre, data.ciudad, data.direccion, data.estado, id]
  );

  res.json(rows[0]);
};
