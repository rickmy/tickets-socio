const pool = require('../database');
const auth = require('../lib/helpers');
const { getDate, getHour } = require('./getTime');

const getUser = async (table, cedula) => {
  try {
    const text = `SELECT * FROM ${table} where id_cedula = $1`;
    const { rows } = await pool.query(text, [cedula]);
    return rows;
  } catch (error) {
    console.log('Error en loginQuery.js', error);
  }
};

const updateUser = async (table, data, cedula) => {
  try {
    const { nombres, direccion, password, telefono, email } = data;
    const newPass = await auth.encryptPassword(password);
    const text = `update ${table} set nombre='${nombres}', direccion='${direccion}', password='${newPass}', telefono=${telefono}, email='${email}' where id_cedula = $1`;
    await pool.query(text, [cedula]);
  } catch (error) {
    console.log(error);
  }
};

const crearRegistro = (cedula, actividad) => {
  try {
    const text = 'insert into registros (fk_users_cliente, fecha, actividad) values( $1, $2, $3 )';
    const date = `${getDate()}/${getHour()}`;
    const values = [cedula, date, actividad];
    pool.query(text, values);
  } catch (error) {
    console.log('Error en loginQuery.js ( Crear registros )', error);
  }
};

module.exports = { getUser, updateUser, crearRegistro };
