/* ==== ERROR OK == (LINK : https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)==== */
//Al intentar guardar un dato me salia este error => ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
//Para asolucionarlo desde MYSQL Workbench en el icono como de papel con un mas, ahi ejecute este codigo =>  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'LadesiempreSQL'
//Luego ejecute este otro codigo => flush privileges;
//Y guala ya esta solucionado.
/* ================================================================================================================================================================== */

module.exports = {

    database : {
        host : 'localhost',
        user : "root",
        password : "LadesiempreSQL",
        database : "database_links"
    }
    
}