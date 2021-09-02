const pool = require('../database');

const deleteUser = (tabla, cedula, estado) => {
  const text = `update ${tabla} set estado = ${estado} where id_cedula = $1`;
  const values = [cedula];

  pool.query(text, values);
};

module.exports = { deleteUser };
