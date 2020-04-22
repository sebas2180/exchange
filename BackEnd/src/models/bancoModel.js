
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
                    resp=>{
                         
                        const sendInfo={
                            status: 752,
                            msj:'Banco encontrados',
                            bancos: resp
                          }
                        resolve(sendInfo);
                    }
                )
            });
    
    }
}