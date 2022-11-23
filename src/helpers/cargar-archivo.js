const path = require('path');
const { v4: uuidv4 } = require('uuid');

const cargarArchivos = (fileUpload, extensiones = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'svg'], pathUbication = '') => {
    return new Promise((resolve, reject) => {
        
        const { archivo } = fileUpload;

        const nombre_extension = archivo.name.split('.');
        const extension = nombre_extension[nombre_extension.length - 1];

        if (!extensiones.includes(extension)) {
            return reject({mgs: `la extensiones permitidas son: ${extensiones}`});  
        }
        const nombreTemporal = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads',pathUbication, nombreTemporal);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }

            resolve(nombreTemporal);
        });
    })
}

module.exports = {
    cargarArchivos
}