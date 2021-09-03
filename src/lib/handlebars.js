const helpers = {};

helpers.colab = (rol) => {
  if (rol == 5) {
    return false;
  } else if (rol == 1 || rol == 2 || rol == 3 || rol == 4) {
    return true;
  }
};

module.exports = helpers;
