
const mysql = require('mysql2');

var connection;
// var db_config={
//             host: 'localhost',
//             user: 'root',
//             password: '1234',
//             database: 'eschange',
//             insecureAuth : true,
//             port: 3306,
//             dateStrings:true
//         }
 
  
var  db_config={
        host: 'db-mysql-nyc1-18623-do-user-6877514-0.a.db.ondigitalocean.com',
        port : 25060,
        user: 'doadmin',
        password: 'vj4gdmbs9si2agwj',
        database: 'exchange',
        insecureAuth : true,
        dateStrings:true,
        "connectTimeout": 30000
}
module.exports = {
 
dbConnection: function () {
  connection = mysql.createPool(db_config);

  connection.query('select 1 + 1', (err, rows) => { /* */ });
  return connection;

  }
}
