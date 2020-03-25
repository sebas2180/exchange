
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();
const Beneficiario = require('../../database/beneficiarios')();
module.exports = {

    

    getBeneficiarios: (id)=>{
        const linea= 'SELECT * FROM beneficiario WHERE id_usuario='+id;
        console.log(linea);
            return new Promise((resolve,reject) =>{
                Beneficiario.findAll({ where:{ id_usuario : id}})
                .then(
                    res=>{
                        resolve(res);
                    }
                )


                // conn.query(linea,(err,res1) => {
                //     if(err) {
                //         console.log(err);
                //     }
                    
                //     if(!res1.length){
                //         resolve([]);
                //     }else{
                //         resolve(res1);
                //     }
                //     resolve(res1);
                // });
            });
    
    },
    addBeneficiario : function(beneficiario) {
    
    const linea = `INSERT INTO beneficiario SET ?`;
    console.log(beneficiario.nombre);
        return new Promise((resolve,reject) =>{
           console.log(beneficiario);
            const lin = `select count(*) as suma from beneficiario where nombre = \'`+beneficiario.nombre+
            `\' and apellido = \'`+beneficiario.apellido+`\' and nro_cuenta=`+beneficiario.nro_cuenta+
            ` and tipo_cuenta=\'`+beneficiario.tipo_cuenta+`\' and tipo_documento=\'`+beneficiario.tipo_cuenta+
            `\' and nro_documento =`+beneficiario.nro_cuenta+` and id_usuario =`+beneficiario.id_usuario+
            ` and banco =\'`+beneficiario.banco+`\'`;

             conn.query(lin,[beneficiario],function (err,rows){        
            console.log(lin);
        if(rows[0].suma>0){
            resolve({status:702,msj:'Ops, ya tienes un beneficiario cargado identico a este.'});
        } else{
            conn.query(linea,[beneficiario],(err,results,fields)=>{  
                if (err) throw err;
                
                if(err) {

                     resolve({status:701,msj:'Error al guardar usuario, reintente mas tarde.'});
                 }
                if(results != null){
                    if(results.affectedRows > 0){
                   
                        resolve({status:700,msj:'guardado correcto',insertId:results.insertId});
                  }
                }
            })  
        }
    });   
          
        });
       
    },
    deleteBeneficiario : function(id){
        return new Promise((resolve,reject)=>{
            const linea ='DELETE FROM beneficiario WHERE id='+id;
            console.log(linea);
            conn.query(linea,function(err,res){
                if (err){
                    //conn.close();
                    resolve({status:703,msj:'Ops!,hubo un error en la eliminacion del beneficiario.'});
                }else{
                    if(res.affectedRows>0){
                        //conn.close();
                        resolve({status:704,msj:'Eliminacion del beneficiario correcta.'});
                    }else{
                       // conn.close();
                        resolve({status:705,msj:'Ops!, este beneficiario ya no existe.'});
                    }
                }
                console.log('eee');
               // conn.close();
                resolve({status:703,msj:'Ops!,hubo un error en la eliminacion del beneficiario.'});
            });
        })
       
    }
}