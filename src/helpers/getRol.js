const pool = require('../database');

//users_colaborador
const getRol = async (table, cedula) => {
  const text = `select roles.nombre from ${table} join roles on fk_rol = roles.id_rol where id_cedula = $1`;
  const values = [cedula];
  const { rows } = await pool.query(text, values);

  return rows[0];
};

module.exports = { getRol };
