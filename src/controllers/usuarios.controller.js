const {getConnection} = require('./../database/database');
const {request, response} = require('express');


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

        //encriptar la password:
        /*const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);*/

        const connection = await getConnection();
        const sql = 'INSERT INTO usuarios set ?';
        const resultado = await connection.query(sql,usuario);

        
        return res.status(200).json({
            ok:true,
            msg:'Usuario creado con exito'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}


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