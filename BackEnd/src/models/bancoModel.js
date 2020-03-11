
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();

module.exports = {

    

    getBancos: ()=>{
        const linea= 'SELECT * FROM bancos';
        console.log(linea);
            return new Promise((resolve,reject) =>{
                conn.query(linea,(err,res1) => {
                    if(err) {
                        console.log(err);
                    };
                    resolve(res1);
                });
            });
    
    }
}