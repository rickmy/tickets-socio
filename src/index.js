const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

//Inicializaciones (Conexion a la DB, express etc)
const app = express();
require('./lib/passport');

// Setings  (las configuraciones del servidor)
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);

app.set('view engine', '.hbs');

// Middlewares
app.use(
  session({
    secret: 'root',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message')[0];
  app.locals.valuesForm = req.flash('valuesForm')[0];
  app.locals.password = req.flash('password');
  app.locals.user = req.user;
  next();
});

// Rutas
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication'));
app.use(require('./routes/links'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Arrancar el servidor
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
