const express = require('express');
const morgan = require('morgan');
const app=express();

app.set('port', 3000)

app.use(express.json());

app.use(morgan("dev"));

app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/transacciones', require('./routes/transacciones.routes'));
app.use('/api/login', require('./routes/auth.routes'));



module.exports = app
