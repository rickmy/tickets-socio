const express = require("express");
const morgan = require ("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

//Inicializaciones (Conexion a la DB express etc)
const app = express();

// Setings  (las configuraciones del servidor)
app.set("port" , process.env.PORT || 4000 );

app.set("views" , path.join(__dirname , 'views' ));  //Aqui le indico donde estan los views

app.engine(".hbs" , exphbs({
    defaultLayout : "main",  //Main es el nombre del archivo principal
    layoutsDir : path.join( app.get("views") , "layouts" ),  //Esta es la direccion de nuestro archivo main. el join de path lo unico que hace es unir directorios
    partialsDir : path.join( app.get("views") , "partials" ),
    extname : ".hbs",  //aqui solo le idico la extncion que van a tener los archivos.
    helpers : require("./lib/handlebars") //En este archivo configuramos las funcioes que necesitaremos y que hanldelbras por si solo no las puede hacer
}));

app.set('view engine' , '.hbs');



// Middlewares
app.use( morgan('dev') );
app.use( express.urlencoded({ extended : false })); //Esto es para decirle que solo voy a haceptar datos en cadena de texto, no imagenes no archivos, gracias a esto nos llegara iformacion desde el cliete
app.use( express.json() );


//Variables globales
app.use( ( req , res , next ) => {
    next()
});

// Rutas 
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication")); 
app.use( "/link" , require("./routes/links"));  // => El "/link" lo que ara esque todas las rutas que creemos en este archivoo llamado links esque tenamos que primero poner "/link" . En este caso creamos una ruta llamda "/add" pero como pusimos aqui "/link" entonces  debemos primero escribir "/link" y luego si "/add" asi => "/link/add"


//Archivos publicos
app.use( express.static( path.join( __dirname , "public" ) ) )


//Arrancar el servidor
app.listen(app.get("port") , () => {
    console.log("Server on port" , app.get("port") );
});