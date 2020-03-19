
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();
const multer  = require('multer');




    module.exports= {  
      prueba: (file,fileName) => {
          try{
            console.log('dashBoardModel');
            return new Promise((resolve,reject)=>{
              const sql =`insert INTO dashboard(imagen) VALUES('${fileName}')`;
              console.log('sql');
              conn.query(sql,(err,rows)=>{
                let resp = {
                  status: "success",
                  statusMessage: "",
                  data: rows
                }
                resolve(resp);
              });
             
             });
// C:\Users\Sebas\OneDrive\Escritorio\Programacion\angular\Exchange\BackEnd\src\assets\imagenes\comprobantes
            
          }catch(err){
            console.log("error");
          }
        }
      }
