const {getConnection} = require('./../database/database');
const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT');

/*Lista todos los usuarios*/ 
const getUsers = async(req=request, res=response)=>{
    try {
        console.log('Controlador usuario');
        const connection = await getConnection();
        const result = await connection.query('SELECT username, nombre, apellido, rol, avatar FROM usuarios');

        res.status(200).json({
            ok:true,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
}

/*Obtiene un usuario x id */
const getUsuario = async(req=request, res=response)=>{
    try {
        const { id }= req.params
        console.log('Controlador usuario');
        const connection = await getConnection();
        const result = await connection.query('SELECT username, nombre, apellido, rol, avatar FROM usuarios WHERE id_user= ?', id);

        res.status(200).json({
            ok:true,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
}

/*Agrega un usuario */
const addUser = async(req, res)=>{

    try {
        const {username, nombre, apellido, email, rol, contrasenia, avatar} = req.body;
    
        const usuario = {
            username,
            nombre,
            apellido,
            email,
            rol,
            contrasenia,
            avatar
        }

        //encriptar la password: añado encriptador, instalo npm bcryptjs, llamo bcrypt
        const salt = bcrypt.genSaltSync();
        usuario.contrasenia= bcrypt.hashSync(contrasenia, salt);

        const connection = await getConnection();
        const sql = 'INSERT INTO usuarios set ?';
        const resultado = await connection.query(sql,usuario);
        /*const token = await generarJWT(resultado[0])*/

        return res.status(200).json({
            ok:true,
            msg:'Usuario creado con exito',
            
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    
    }
}

/*actualiza usuario */
const updateUser = async(req, res)=>{
    try {
        const { id } = req.params

        const {id_user, username, nombre, apellido, email, rol, contrasenia, avatar} = req.body;
        const usuario = {
            id_user,
            username,
            nombre,
            apellido,
            email,
            rol,
            contrasenia,
            avatar
        }
        const connection = await getConnection();
         
        const resultado = await connection.query('UPDATE usuarios SET ? WHERE id_user= ?', [usuario, id]);
        
        return res.status(200).json({
            resultado,
            ok:true,
            msg:'Usuario modificado con exito'
            
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}


/*elimina usuario */
const deleteUsuario = async(req=request, res=response)=>{
    try {
        const { id }= req.params
        console.log('Controlador usuario');
        const connection = await getConnection();
        const result = await connection.query('DELETE FROM usuarios WHERE id_user= ?', id);

        res.status(200).json({
            ok:true,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
}


module.exports ={
    getUsers,
    getUsuario,
    addUser,
    updateUser,
    deleteUsuario
}