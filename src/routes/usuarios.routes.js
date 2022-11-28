const {Router}  = require('express');
const { getUsers, addUser, updateUser, getUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { generarJWT } = require('../helpers/JWT');

const route = Router();

route.get('/', getUsers);
route.get('/:id', getUsuario);
route.post('/', addUser, generarJWT);
route.put('/:id', updateUser);
route.delete('/:id', deleteUsuario)

module.exports = route;