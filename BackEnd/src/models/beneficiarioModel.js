
const mysql = require('../../database/mysql');
const conn = mysql.dbConnection();

module.exports = {

    

    getBeneficiarios: (id)=>{
        const linea= 'SELECT * FROM beneficiario WHERE id_usuario='+id;
        console.log(linea);
            return new Promise((resolve,reject) =>{
                conn.query(linea,(err,res1) => {
                    if(err) {
                        console.log(err);
                    }
                    
                    if(!res1.length){
                        resolve([]);
                    }else{
                        resolve(res1);
                    }
                    resolve(res1);
                });
            });
    
    },
    addBeneficiario : function(beneficiario) {
    
    
       const linea = 'INSERT INTO beneficiario(nombre,apellido,tipo_documento,nro_documento,'+
                                        'tipo_cuenta,nro_cuenta,id_banco,id_usuario)'+
                                            ' VALUES(\''+beneficiario.nombre+'\','+
                                                '\''+beneficiario.apellido+'\','+
                                                '\''+beneficiario.tipo_documento+'\','+
                                                    beneficiario.nro_documento+
                                                ',\''+beneficiario.tipo_cuenta+'\','+
                                                    beneficiario.nro_cuenta+
                                                ',\''+beneficiario.id_banco+'\','+
                                                    beneficiario.id_usuario+
                    ')';
        return new Promise((resolve,reject) =>{
            const lin = 'select count(*) as suma from beneficiario where nombre = ? and apellido = ? and nro_cuenta=?'
            'and tipo_cuenta=? and tipo_documento=? and nro_documento =? and id_usuario =?'
            'and id_banco =?';
              console.log(lin);
             conn.query(lin,[beneficiario.nombre,beneficiario.apellido,beneficiario.nro_cuenta,
                    beneficiario.tipo_cuenta,beneficiario.tipo_documento,
                    beneficiario.nro_documento,beneficiario.id_usuario,beneficiario.id_banco]
                    ,function (err,rows){
            
        if(rows[0].suma>0){
            conn.close();

            resolve({status:702,msj:'Ops, ya tienes un beneficiario cargado identico a este.'});
        }  
    });
            const resp= conn.query(linea,(err,results,fields)=>{
                conn.close();
                if(err) {
                    conn.close();
                    resolve({status:701,msj:'Error al guardar usuario, reintente mas tarde.'});
                }
                if(results != null){
                    if(results.affectedRows > 0){
                        conn.close();
                        resolve({status:700,msj:'guardado correcto',insertId:results.insertId});
                    }
                }
            })      
          
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