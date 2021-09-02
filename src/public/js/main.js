/* ESTO NOS SERVIRA PARA AGREAGAR EL ACTIVE AL NOMBRE DE LA PASTAÑA EN EL NAVBAR DEPENDIENTE DE EN QUE PESTAÑA SE ENCUENTRE */
const { pathname } = window.location;
const registrarse = document.getElementById('registrarse');
const planActual = document.getElementById('planActual');
const perfil = document.getElementById('perfil');
const planes = document.getElementById('planes');
const login = document.getElementById('login');
const admin = document.getElementById('admin');

switch (pathname) {
  case '/links':
    planActual.classList.add('active');
    break;

  case '/links/add':
    planes.classList.add('active');
    break;

  case '/profile':
    perfil.classList.add('active');
    break;

  case '/signin':
    login.classList.add('active');
    break;

  case '/signup':
    registrarse.classList.add('active');
    break;

  case '/registros':
    registrarse.classList.add('active');
    break;

  case '/admin':
    admin.classList.add('active');
    break;

  default:
    break;
}
/* *FIN ESTO NOS SERVIRA PARA AGREAGAR EL ACTIVE AL NOMBRE DE LA PASTAÑA EN EL NAVBAR DEPENDIENTE DE EN QUE PESTAÑA SE ENCUENTRE */

/* *FIN VALIDAR FORM DE LOGIN */
