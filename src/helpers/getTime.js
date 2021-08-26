const getHour = () => {
  const date = new Date();

  const hora = `${date.getHours()}:${date.getMinutes()}`;

  return hora;
};

const getDate = () => {
  const date = new Date();

  const fecha = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return fecha;
};

module.exports = {
  getHour,
  getDate,
};
