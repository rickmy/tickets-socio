const express = require("express");
const router = express.Router();
const passport = require("passport");
const { route } = require("./links");
const { isLoggedIn , isNotLoggedIn } = require('../lib/auth');

router.get("/signup" ,isNotLoggedIn , ( req , res ) => {
    res.render("auth/signup")
});

//PUDES HACERLO ASI O COMO LO HICIMOS EN LAS LINEAS DE ABAJO, ES LO MISMO
// router.post("/signup" , ( req , res ) => {
//     passport.authenticate("local.signup" , {
//         successRedirect : '/profile',
//         failureRedirect : 'signup',
//         failureFlash : true
//     }); //Este es el nombre que hemos creado en el archivo de autentication
//     res.send("Recived")
// });

router.post("/signup" ,  passport.authenticate("local.signup" , {  //Aqui talves te confundas por que no ves ningun console.log y aun asi puedes ver los datos que fueron enviados al momento de registrase, bueno es por que cuando hacemos POST este viaja al archivo passport, fijate que el nombre "local.signup" coincide en aquella pagina
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
})); //Este es el nombre que hemos creado en el archivo de autentication


router.get('/signin' , isNotLoggedIn , ( req , res ) => {
    res.render('auth/signin')
});

router.post("/signin" , ( req , res , next ) => {
    passport.authenticate('local.signin' , {
        successRedirect : '/profile',
        failureRedirect : '/signin',
        failureFlash : true
    })( req , res , next );
});


router.get('/profile' , isLoggedIn , ( req , res ) => {
    res.render('profile')
});

router.get('/logout' , ( req , res ) => {
    req.logOut(); //esto es lo que hace que se cierra la sesion del usuario.
    res.redirect('/signin')
});


module.exports = router;

//Hasta aqui minuto -> 2:27:58