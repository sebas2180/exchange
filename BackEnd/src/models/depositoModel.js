
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();


    module.exports= {
      
      getDepositos: (id) => {
        console.log('id_user' +(id));
          const linea = 'SELECT * FROM depositos d WHERE d.id_user='+id;
          console.log(linea);
          return new Promise((resolve, reject) => {
            conn.query(linea, function(err, results) {
              if (err) {
                throw err;
              }
              conn.close();
              resolve((results));
            });
          })
        },
        
      
      getEstadisticasDelUsuario: (id) => {
        console.log(id);
          const linea = 'SELECT count(1) as cantidad FROM depositos d WHERE d.id_user='+id;
          console.log(linea);
          return new Promise((resolve, reject) => {
            conn.query(linea, function(err, results) {
              if (err) {
                throw err;
              }
              conn.close();
              resolve((JSON.stringify(results)));
            });
          })
        }    
      }
