import  { Users } from '../Model/Usuarios.js';

const crearUsuario = async (req, res) => {
    try {
        const {nombre, email, address} = req.body;
        const CreoUsuario = await Users.create({nombre, email, address});
        res.status(201).json(CreoUsuario);
    }
    catch(error){
        res.status(500).json({mesage: 'No se pudo crear el usuario', error: error.mesage});
    }
    module.exports = {crearUsuario};
}