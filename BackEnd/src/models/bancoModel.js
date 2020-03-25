
//const mysql = require('../../database/mysql');
//const conn = mysql.dbConnection();
const Bancos = require('../../database/bancos')();
module.exports = {

    

    getBancos: ()=>{
        const linea= 'SELECT * FROM bancos';
        console.log(linea);
            return new Promise((resolve,reject) =>{
                Bancos.findAll()
                .then(
                    res=>{
                        sequelize.close ()
                        resolve(res);
                    }
                )

                // conn.query(linea,(err,res1) => {
                //     if(err) {
                //         conn.release();
                //         console.log(err);
                //     };
                //     c
                //     resolve(res1);
                // });
            });
    
    }
}