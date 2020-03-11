
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();

module.exports = {
    getUsuarios : function() { 
        const linea = 'SELECT * FROM USUARIOS';
        console.log(linea);
        conn.query(linea,(err,res1) => {
        if(err) {
            console.log(err);
        };
        return res1;
        });

    },
    getUsuario : function(id) { 
        const linea = 'SELECT * FROM USUARIOS WHERE id='+id;
        console.log(linea);
        return new Promise((resolve,reject) =>{
            conn.query(linea,(err,res1) => {
                if(err) {
                    console.log(err);
                }
                
                if(!res1.length){
                    resolve([]);
                }else{
                    // console.log(res1);
                    resolve(res1);
                }
                resolve(res1);
            });
        });

    }
}
