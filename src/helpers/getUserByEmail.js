const pool = require('../database');

const getUserByEmail = async (email) => {
  email.trim();

  let rows = [];

  const text = `SELECT * FROM users_cliente where email = $1`;
  const cliente = await pool.query(text, [email]);

  if (cliente.rows.length > 0) {
    rows = cliente.rows;
  }

  const textDos = `SELECT * FROM users_colaborador where email = $1`;
  const colaborador = await pool.query(textDos, [email]);

  if (colaborador.rows.length > 0) {
    rows = colaborador.rows;
  }

  return rows;
};

module.exports = { getUserByEmail };
