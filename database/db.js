const mysql = require('mysql');
const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user:  process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
        
})

conexion.connect ((error => {

    if(error){

        console.log("Error: " + error);
        return
    }   else console.log("Connected: to MySQL");
}))

module.exports = conexion