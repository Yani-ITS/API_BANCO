const mysql = require('promise-mysql');
/*const config = require("./../config");*/
/*import { config } from './../config';*/

const connection = mysql.createConnection({
    host:'localhost',
    database:'Api_Banco',
    user:'vagnoni',
    password:'clase1234',
    port:3306
})

/*const connection = mysql.createConnection({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password,
    /*NO PUEDO HACER FUNCIONAR CONFIG + .ENV
})*/

const  getConnection = ()=>{
    console.log("anda")
    return connection
    
}

module.exports = {
    getConnection
}