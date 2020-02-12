

const mysql = require('mysql2');

var connection;

module.exports = {
hola:  function(){
    console.log('hola');

},

dbConnection: function () {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'exchange',
        insecureAuth : true,
        port: 3306,
        dateStrings:true
    });
    console.log('conexion a BD exitosa');
    connection.connect();
    return connection;
}

};