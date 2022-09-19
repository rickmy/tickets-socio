 /* ESTO NOS SERVIRA PARA AGREAGAR EL ACTIVE AL NOMBRE DE LA PASTAÑA EN EL NAVBAR DEPENDIENTE DE EN QUE PESTAÑA SE ENCUENTRE */
const { pathname } = window.location;
const inicio = document.querySelector('.inicio');
const bus = document.querySelector('.bus');
const datalle = document.querySelector('.datalle');

console.log(pathname);

switch (pathname) {
  case '/':
    inicio.classList.add('active');
    break;

  case '/bus':
    bus.classList.add('active');
    break;

  case '/detalle':
    datalle.classList.add('active');
    break;
}
