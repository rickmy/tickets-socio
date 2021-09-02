const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const { getDate } = require('../helpers/getTime');
const { getUser, crearRegistro } = require('../helpers/loginQuery');
const { userExist } = require('../helpers/userExist');

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'cedula',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, cedula, password, done) => {
      try {
        let rows = [];

        const cliente = await getUser('users_cliente', cedula);

        if (cliente.length > 0) {
          rows = cliente;
        }

        const colaborador = await getUser('users_colaborador', cedula);

        if (colaborador.length > 0) {
          rows = colaborador;
        }

        if (rows.length > 0) {
          if (rows[0].estado == false) {
            return done(null, false, req.flash('message', 'El usuario  no existe'));
          }

          const user = rows[0];

          const validPassword = await helpers.matchPassword(password, user.password);
          if (validPassword) {
            crearRegistro(user.id_cedula, 'Login');
            done(null, user, req.flash('success', 'Welcome', user.nombre));
          } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
          }
        } else {
          return done(null, false, req.flash('message', 'El usuario  no existe'));
        }
      } catch (error) {
        return done(null, false, req.flash('message', 'Error de conexion, intenta mas tarde'));
      }
    }
  )
);

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      if (await userExist(username)) {
        return done(null, false, req.flash('message', 'El numero de cedula ya existe.'));
      }

      const { nombres, direccion, telefono, email } = req.body;
      const fecha_registro = getDate();
      const fk_rol = 5;

      const encryptPassword = await helpers.encryptPassword(password);

      try {
        const text =
          'INSERT INTO users_cliente( id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email, estado ) values( $1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email, estado';
        const values = [
          username,
          nombres,
          direccion,
          encryptPassword,
          telefono,
          fecha_registro,
          fk_rol,
          email,
          true,
        ];

        const result = await pool.query(text, values);

        crearRegistro(result.rows[0].id_cedula, 'Registro');

        return done(
          null,
          result.rows[0],
          req.flash('success', `Bienvenido ${result.rows[0].nombre}`)
        );
      } catch (error) {
        console.log(error);
        return done(null, false, req.flash('message', 'Error de conexion, intenta mas tarde'));
      }
    }
  )
);

passport.use(
  'local.signup.cola',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      if (await userExist(username)) {
        return done(null, false, req.flash('message', 'El numero de cedula ya existe.'));
      }
      const { nombres, direccion, telefono, roles, email, password_conf } = req.body;

      const fecha_registro = getDate();

      const encryptPassword = await helpers.encryptPassword(password);

      try {
        const text =
          'INSERT INTO users_colaborador( id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email, estado ) values( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email, estado';
        const values = [
          username,
          nombres,
          direccion,
          encryptPassword,
          telefono,
          fecha_registro,
          roles,
          email,
          true,
        ];

        const result = await pool.query(text, values);
        crearRegistro(result.rows[0].id_cedula, 'Registro colaborador');
        return done(
          null,
          result.rows[0],
          req.flash('success', `Bienvenido ${result.rows[0].nombre}`)
        );
      } catch (error) {
        console.log(error);
        console.log('Error: Archivo passport.js');
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id_cedula);
});

passport.deserializeUser(async (id, done) => {
  let user = {};
  const values = [id];
  const text = 'SELECT * FROM users_cliente WHERE id_cedula = $1';
  user = await pool.query(text, values);

  if (user.rows.length < 1) {
    const text_colaborador = 'SELECT * FROM users_colaborador WHERE id_cedula = $1';
    user = await pool.query(text_colaborador, values);
  }

  done(null, user.rows[0]);
});
