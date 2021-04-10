const mysql = require("mysql");
const { database } = require("./keys");
const { promisify } = require('util'); //Este modulo sirve para poder pasar a algunas funciones de callback a promesas

const pool =  mysql.createPool( database );

pool.getConnection(( err , conexion ) => {
    if( err ){
        if( err.code === "PROTOCOL_CONNECTION_LOST" ){
            console.error("La conexion de la base de datos fue perdida")
        }
        if( err.code === 'ER_CON_COUNT_ERROR' ){
            console.error("La DB tiene muchas conexiones")
        }

        if( err.code === 'ECONNREFUSED' ){
            console.error("La conexion de la DB fue rechazada ");
        }

        if( conexion ) conexion.release();
        console.log("La DB esta conectada");
        return;
    }
});

//De promesas a callbacks
pool.query = promisify(pool.query);

module.exports = pool;
