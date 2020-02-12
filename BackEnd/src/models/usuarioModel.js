
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

    }
}
