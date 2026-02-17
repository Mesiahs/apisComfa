import { pool } from "../db.js";

export const getFacturas = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM facturas");
  res.json(rows);
};

export const getFactura = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM facturas WHERE id_facturas = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Factura not found" });
  }

  res.json(rows[0]);
};

export const createFactura = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      `INSERT INTO facturas
       (id_user, fecha_factura, total, tipo_factura)
       VALUES ($1, NOW(), $2, $3)
       RETURNING *`,
      [
        data.id_user,
        data.total,
        data.tipo_factura
      ]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
