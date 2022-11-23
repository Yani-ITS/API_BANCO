const {getConnection} = require('./../database/database');
const {request, response} = require('express');

/* ver las transacciones */
const getTransaccion = async(req=request, res=response)=>{
    try {
        console.log('Controlador transacciones');
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM transacciones');

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

/*registrar transacciones */
const addTransaccion = async(req, res)=>{
    try {
        const {origen, destino, cantidad, fecha} = req.body;
        const operacion = {
            origen,
            destino,
            cantidad,
            fecha
        }

        const connection = await getConnection();
        const sql = 'INSERT INTO transacciones set ?';
        const resultado = await connection.query(sql, operacion);

        
        return res.status(200).json({
            ok:true,
            msg:'Operación guardada correctamente'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}


module.exports = {
    getTransaccion,
    addTransaccion
}