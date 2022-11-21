//creo el controlador del login (2° paso)

const {getConnection} = require('../database/database');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT'); //voy  a completar jwt.js

const login = async(req, res)=>{
    /**
     * en el login enviamos el usuario y contraseña
     */
    const {username, contrasenia} = req.body;

    try {

        console.log(username);
        const connection = await getConnection();
        const resultado = await connection.query('SELECT id_user, contrasenia FROM usuarios where username = ?',username);


        console.log(resultado[0]);
        //comparar contrasenia
        if(resultado.length < 1){
            return res.status(404).json({
                ok:false,
                error:'Datos incorrectos'
            })
        }

        console.log(resultado[0].contrasenia)

        //si encontramos el usuario validamos la contrasenia
        const validcontrasenia = bcrypt.compareSync(contrasenia,(resultado[0].contrasenia));
        console.log(validcontrasenia);
        if(!validcontrasenia){
            return res.status(404).json({
                ok:false,
                error:'Contraseña incorrecta'
            })
        }
        
        //si existe el usuario y la contrasenia es correcta generamos el token

        console.log(resultado[0].id);
        const token = await generarJWT(resultado[0].id)

        res.status(200).json({
            ok:true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }

}

module.exports = {
    login
}