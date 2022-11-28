//1° paso, cargo el upload controller

const { request, response } = require('express');
const { getConnection } = require('../database/database');
const { cargarArchivos } = require('../helpers/cargar-archivo');
const path = require('path');
const fs = require('fs');

const subirArchivo = async(req = request, res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('Los archivos no han sido subidos.');
      return;
    }
  
    const pathUpload = await cargarArchivos(req.files, undefined,'../uploads/documents');
  
    res.json(
      pathUpload,
      console.log('subido')
    )
  } //primer parte

  
const updateImage = async(req = request, res=response)=>{

    const {id, coleccion} = req.params;
  
    const connection = await getConnection()
  
    switch(coleccion){
      case'users':
          const user = await connection.query('SELECT id_user, avatar FROM usuarios WHERE id_user = ? ', id);
          console.log(user)
          if(user.length<1){
            return res.status(400).json({
              msg: `No existe usuario con id: ${id}`
            })
          }else{
  
            //limpiar imagenes previas
  
            const img = user[0].avatar;
            try {
              if(img){
                const pathImage = path.join(__dirname, '../uploads/images', coleccion, img);
                if(fs.existsSync(pathImage)){
                  fs.unlinkSync(pathImage);
                }
              }
            } catch (error) {
              
            }
  
            const nombreImagen = await cargarArchivos(req.files, undefined,'images/users');
            await connection.query('Update usuarios set avatar=? where id_user = ?', [nombreImagen, id]);
  
            res.status(200).json({
              ok:true,
              msg:'imagen actualizada con exito!'
            })
  
          }
          
          break;
  

  }
}

const getImage = async (req=request, res=response)=>{
    const {id, coleccion} = req.params;
  
    const connection = await getConnection();
    const user = await connection.query('SELECT id_user, avatar FROM usuarios WHERE id_user = ? ', id);
    if(user.length<1){
      return res.status(400).json({
        msg: `No existe usuario con id: ${id}`
      })
    }else{
  
      //limpiar imagenes previas
  
      const img = user[0].avatar;
      try {
        if(img){
          const pathImage = path.join(__dirname, '../uploads/images', coleccion, img);
          if(fs.existsSync(pathImage)){
            console.log(pathImage);
            return res.sendFile(pathImage)
          }
        }
      } catch (error) {
        res.status(500).json({
          ok:false,
          msg:error.msg
        })
      }
    }
  
    res.json({
      msg: 'Falta place Holder'
    }) 
  }
    
  module.exports = {
      subirArchivo,
      updateImage,
      getImage
  }

  //sin error, voy a cargar los helpers