const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app=express();

app.set('port', 3000)

app.use(express.json());

app.use(morgan("dev"));


app.use(fileUpload());

app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/transacciones', require('./routes/transacciones.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/uploads',require('./routes/upload.routes'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



module.exports = app
