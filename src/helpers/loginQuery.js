const pool = require('../database');
const auth = require('../lib/helpers');

const getUser = async (table, cedula) => {
  const text = `SELECT * FROM ${table} where id_cedula = $1`;
  const { rows } = await pool.query(text, [cedula]);

  return rows;
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

module.exports = { getUser, updateUser };
