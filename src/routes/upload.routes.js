const {Router} = require('express');
const { subirArchivo, updateImage, getImage } = require('../controllers/upload.controller')
const {check} = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/db-validator');

const route = Router();

route.post('/api/upload', subirArchivo);
route.get('/:coleccion/:id',[
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users']))
],getImage)
route.put('/:coleccion/:id',[
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users']))
],updateImage)

module.exports = route;

//lo ultimo sería el app
