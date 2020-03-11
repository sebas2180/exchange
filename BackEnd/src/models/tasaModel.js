
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();

module.exports = {
   getTasas: ()=>{
    const linea = 'SELECT * FROM tasas';
    console.log(linea);
    return new Promise((resolve, reject) => {
      conn.query(linea, function(err, results) {
        if (err) {
          throw err;
        }
       
        resolve((results));
      });
    })
    }, getTasa: (pais)=>{
        const linea = 'SELECT * FROM tasas WHERE pais=\''+pais+'\'';
        console.log(linea);
        return new Promise((resolve, reject) => {
          conn.query(linea, function(err, results) {
            if (err) {
              throw err;
            }
           
            resolve((results));
          });
        })
        }
}