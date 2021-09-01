const nameValidate = (req, name) => {
  if (name != '') {
    if (name.length > 3 && name.length < 50) {
      return true;
    } else {
      req.flash('message', '• Los nombres deben ser entre 3 y 50');
      return false;
    }
  } else {
    req.flash('message', '• Los nombres son obligatorios');
    return false;
  }
};

const cedulaValidate = (req, cedula) => {
  cedula.trim();

  if (cedula != '') {
    if (cedula.length == 10) {
      return true;
    } else {
      req.flash('message', '• La cedula debe contener 10 numeros');
      return false;
    }
  } else {
    req.flash('message', '• La cedula es obligatoria');
    return false;
  }
};

const direccionValidate = (req, direccion) => {
  if (direccion != '') {
    if (direccion.length > 5 && direccion.length < 50) {
      return true;
    } else {
      req.flash('message', 'La direccion debe tener entre 5 y 50');
      return false;
    }
  } else {
    req.flash('message', '• La direccion es obligatoria');
    return false;
  }
};

const telefonoValidate = (req, telefono) => {
  telefono.trim();

  if (telefono != '') {
    if (telefono.length == 10) {
      return true;
    } else {
      req.flash('message', '• El telefono debe tener 10 numeros');
      return false;
    }
  } else {
    req.flash('message', '• El telefono es obligatorio');
    return false;
  }
};

const emailValidate = (email) => {
  return true;
};

const passwordValidate = (req, pass, pass2) => {
  pass.trim();

  if (pass != '') {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(pass);

    if (passRegex) {
      if (pass == pass2) {
        return true;
      } else {
        req.flash('message', '• Los password deben coincidir');
        return false;
      }
    } else {
      req.flash(
        'message',
        '• Password: -Min 8. -Max 15. -Una letra mayúscula. -Una minuscula. -Un numero. -No espacios en blanco. -Un caracter especial \n'
      );
      return false;
    }
  } else {
    req.flash('message', '• Ingresa un password');
    return false;
  }
};

module.exports = {
  nameValidate,
  cedulaValidate,
  direccionValidate,
  telefonoValidate,
  emailValidate,
  passwordValidate,
};
