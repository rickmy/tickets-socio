const { database } = require('./keys');
const { Pool } = require('pg');

const pool = new Pool(database);

pool.connect((err, conexion) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('La conexion de la base de datos fue perdida');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La DB tiene muchas conexiones');
    }

    if (err.code === 'ECONNREFUSED') {
      console.error('La conexion de la DB fue rechazada ');
    }

    if (conexion) conexion.release();
    console.log('La DB esta conectada');
    return;
  }
});

module.exports = pool;
