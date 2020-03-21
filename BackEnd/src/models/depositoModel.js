
const mysql = require('../../database/mysql');
var depositos = require('../../database/deposito')();
const conn = mysql.dbConnection();


    module.exports= {
      
      getDepositos: (id) => {
        console.log('id_user' +(id));
          const linea = 'SELECT * FROM depositos d WHERE d.id_user='+id+' order by d.fecha DESC';
          console.log(linea);
          return new Promise((resolve, reject) => {
            conn.query(linea, function(err, results) {
              if (err) {
                throw err;
              }
              resolve((results));
            });
          })
        },
        getDepositos: () => {
            return new Promise((resolve, reject) => {
              depositos.findAll()
                .then(
                  res=>{
                    console.log(res);
                    resolve(res);
                  }
                )
            })
          },
          getDepositosOnlyVerif: () => {
            return new Promise((resolve, reject) => {
              depositos.findAll({     where: {  status      : "EN VERIFICACION"             }    })
                .then(
                  res=>{
                    console.log(res);
                    resolve(res);
                  }
                )
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
            
              resolve((JSON.stringify(results)));
            });
          })
        }   ,
        getDepositosForDestinatario:(beneficiario) => {
          console.log(beneficiario);
          return new Promise((resolve,reject)=>{
            conn.query('SELECT * FROM depositos WHERE id_user=? and id_destinatario=?',
            [beneficiario.id_user,beneficiario.id_destinatario],(err,res)=>{
              if(err) throw err;

              resolve(res);
            });
          });
        },
        addDeposito:(req) =>{
          return new Promise((resolve,reject)=>{

            const linea =  `INSERT INTO depositos set? `;
            console.log(linea);
            conn.query(linea,[req.body],(err,result)=>{
              resolve({status:721,id_deposito:result.insertId});
            });
          });
        }
      }
