import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Usuarios = db.define('Usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Usuarios;
