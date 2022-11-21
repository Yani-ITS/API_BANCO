const {Router}  = require('express');
const { getUsers, addUser, updateUser, getUsuario, deleteUsuario } = require('../controllers/usuarios.controller');

const route = Router();

route.get('/', getUsers);
route.get('/:id', getUsuario);
route.post('/', addUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUsuario)

module.exports = route;