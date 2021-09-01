const { getUser } = require('./loginQuery');

const userExist = async (cedula) => {
  const cliente = await getUser('users_cliente', cedula);

  if (cliente.length > 0) {
    console.log(cliente.length, 'USEEEEEEEEEEEEEER');
    return true;
  }

  const colaborador = await getUser('users_colaborador', cedula);

  if (colaborador.length > 0) {
    console.log(colaborador.length, 'COLAAAAAAAAA');
    return true;
  }

  console.log('FUERAAAAAAAAA');

  return false;
};

module.exports = { userExist };
