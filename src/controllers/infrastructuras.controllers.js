import { pool } from "../db.js";

export const getInfraestructuras = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM infrastructuras");
  res.json(rows);
};




export const getInfraestructura = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM infrastructuras WHERE id_infrastructuras = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Infraestructura not found" });
  }

  res.json(rows[0]);
};

export const getInfraestructurasByCentro = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM infrastructuras WHERE id_centro = $1",
    [id]
  );

  res.json(rows);
};

export const createInfraestructura = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO infrastructuras
       (id_centro, tipo, nombre, capacidad, tarifa_plena, estado)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.id_centro,
        data.tipo,
        data.nombre,
        data.capacidad,
        data.tarifa_plena,
        data.estado
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteInfraestructura = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM infrastructuras WHERE id_infrastructuras = $1",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Infraestructura not found" });
  }

  return res.sendStatus(204);
};

export const updateInfraestructura = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    `UPDATE infrastructuras
     SET tipo = $1, nombre = $2, capacidad = $3,
         tarifa_plena = $4, estado = $5
     WHERE id_infrastructuras = $6
     RETURNING *`,
    [
      data.tipo,
      data.nombre,
      data.capacidad,
      data.tarifa_plena,
      data.estado,
      id
    ]
  );

  res.json(rows[0]);
};
