const {Router} = require('express');

const { login } = require('../controllers/auth.controller');
const { validarJWT } = require('../middleware/validar-jwt');


const router=Router();

router.post('/', validarJWT, login)

module.exports = router;