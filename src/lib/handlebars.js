const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
  //Esto es lo que me mostrara en los links , ejemplo, 2 minutes ago
  return format(timestamp);
};

helpers.colab = (rol) => {
  if (rol == 5) {
    return false;
  } else if (rol == 1 || rol == 2 || rol == 3 || rol == 4) {
    return true;
  }
};

module.exports = helpers;
