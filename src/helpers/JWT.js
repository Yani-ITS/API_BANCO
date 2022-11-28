const jwt = require('jsonwebtoken');


const generarJWT = (id) => {
    return new Promise((resolved, reject) => {
        
        const payload = {id};
        console.log("vino aca");

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                console.log("vino aca");
                resolved(token);
            }
        });
    });

}


module.exports = {
    generarJWT
}

//voy a completar los middlewares
