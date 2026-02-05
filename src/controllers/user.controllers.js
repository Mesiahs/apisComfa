import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows); 
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
  if (rows.length === 0){
    return res.status(404).json({ message: "user not found" })
  }
  
  res.json(rows[0]);


}

export const createUser = async (req, res) => {
    try{
        const data = req.body;
        const {rows} = await pool.query('INSERT INTO users (nombre, email, edad, num_cc, tip_documento, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [data.nombre, data.email, data.edad, data.num_cc, data.tip_documento, data.tipo_usuario ]);
        return res.json(rows[0]);
    } catch (error) {
        if (error?.code === "23505"){
            return res.status(409).json({message: "Email already exists"});
        }
        return res.status(500).json({ message: " internal server error"});

    }
    
  
  
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',[id]);

  if (rowCount === 0){
    return res.status(404).json ({ message: "User not found" });
  }

  return res.sendStatus(204);

}

export const updateUser = async(req, res) => {
  const { id } = req.params;
  const data = req.body;

  const {rows} = await pool.query('UPDATE users SET nombre = $1, email = $2, edad = $3, num_cc = $4, tip_documento = $5, tipo_usuario = $6 WHERE id = $7 RETURNING *', [data.nombre, data.email, data.edad, data.num_cc, data.tip_documento, data.tipo_usuario , id]);

  return res.json(rows[0]);
}