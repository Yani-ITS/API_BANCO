const coleccionesPermitidas = (coleccion = '', colecciones = [])=>{

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida`)
    }

    return true;
}

module.exports = {
    coleccionesPermitidas
}
//ahora hago el upload.route
