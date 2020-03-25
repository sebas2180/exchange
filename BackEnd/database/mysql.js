

const mysql = require('mysql2');

var connection;

module.exports = {
hola:  function(){
    console.log('hola');

},

dbConnection: function () {

    // connection = mysql.createConnection({
    //     host: 'us-cdbr-iron-east-01.cleardb.net',
    //     user: 'bb4140aeaa24a0',
    //     password: 'af327668',
    //     // database: 'heroku_3f3fe830ae5ac81',
    //     insecureAuth : true,
    //     port: 3306,
    //     dateStrings:true
    // });


    console.log('a');
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