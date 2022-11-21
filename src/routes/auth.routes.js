const {Router} = require('express');

const { login } = require('../controllers/auth.controller');


const router=Router();

router.post('/', login)

module.exports = router;