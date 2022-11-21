const {request, response} = require('express');
const {validationResult} = require('express-validator');

const validarCampo = (req=request, res=response, next)=>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampo
}

//donde llamo los middleware?, los deje sin efecto xq me tiraba error
