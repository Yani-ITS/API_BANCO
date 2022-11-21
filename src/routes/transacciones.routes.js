const {Router}  = require('express');
const { getTransaccion, addTransaccion } = require('../controllers/transaccion.controller');

const route = Router();

route.get('/', getTransaccion);
route.post('/', addTransaccion);

module.exports = route