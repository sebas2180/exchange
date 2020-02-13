
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();


    module.exports.getDepositos= (id) => {
      console.log(id);
        const linea = 'SELECT * FROM depositos d WHERE d.id_user='+id;
        return new Promise((resolve, reject) => {
          conn.query(linea, function(err, results) {
            if (err) {
              throw err;
            }
            resolve((results));
          });
        })
      
      }
      module.exports.getDepositos;
