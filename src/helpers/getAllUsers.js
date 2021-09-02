const { assign } = require('nodemailer/lib/shared');
const pool = require('../database');

const getAllUsers = async () => {
  const textCliente = 'select * from users_cliente where estado = true';
  const textColab = 'select * from users_colaborador where estado = true';

  const textClienteRows = await pool.query(textCliente);
  const textColabRows = await pool.query(textColab);

  const rows = [...textClienteRows.rows, ...textColabRows.rows];

  return rows;
};

const getAllUsersInactive = async () => {
  const textCliente = 'select * from users_cliente where estado = false';
  const textColab = 'select * from users_colaborador where estado = false';

  const textClienteRows = await pool.query(textCliente);
  const textColabRows = await pool.query(textColab);

  const rows = [...textClienteRows.rows, ...textColabRows.rows];

  return rows;
};

module.exports = { getAllUsers, getAllUsersInactive };
