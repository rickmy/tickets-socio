const pool = require('../database');
const { getUser } = require('./loginQuery');
const helpers = require('../lib/helpers');

const updatePassword = async (req, cedula, pass) => {
  const encryptPassword = await helpers.encryptPassword(pass);

  let rows = [];

  const cliente = await getUser('users_cliente', cedula);

  if (cliente.length > 0) {
    rows = cliente;
  }

  const colaborador = await getUser('users_colaborador', cedula);

  if (colaborador.length > 0) {
    rows = colaborador;
  }

  if (rows[0].fk_rol != 5) {
    const text = `update users_colaborador set password=$1 where id_cedula = $2`;
    pool.query(text, [encryptPassword, cedula]);
  } else {
    const text = `update users_cliente set password=$1 where id_cedula = $2`;
    pool.query(text, [encryptPassword, cedula]);
  }
};

module.exports = {
  updatePassword,
};
