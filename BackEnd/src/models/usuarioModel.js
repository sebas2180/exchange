
const mysql = require('../../database/mysql');
var User = require('../../database/usuarios')();
const conn = mysql.dbConnection();
var crypto  = require('crypto');

module.exports = {
    getUsuarios : function() { 
        User =  require('../../database/usuarios')();
        return new Promise((resolve,reject)=>{
            User.findAll()
                .then(
                    res=>{
                     
                        resolve(res);
                    }
                )
        })
    },
    getRol: function(id_user){     
    return new Promise((resolve,reject)=>{
        User.findOne({     where: {  id      : id_user             }    })
        .then(
            res=>{
                if(res){
                //    console.log(res.dataValues);
                    const aux =res.dataValues;
                    const msj={
                        status:752,
                        rol:aux['rol']
                    }
                
                    resolve(msj);
                   
                }else{
                    const msj={
                        status:753,
                        rol: "Error al obtener el rol"
                    }
                 
                    resolve(msj);
                }
            }
        )
    })

    },
    getUsuario : function(id) { 
        return new Promise((resolve,reject)=>{
            User.findOne({ where:{ id : id}})
            .then(
                res=>{
                 
                    resolve(res);
                }
            )
        })
    },
    getUserForEmail : function(email) { 
        return new Promise((resolve,reject)=>{
            User.findOne({ where:{ email : email}})
            .then(
                res=>{
       
                    resolve(res);
                }
            )
        })
    },
    usuarioVerificado : function(usuario) { 
        return new Promise((resolve,reject)=>{
        
            const linea = 'SELECT count(1) as count FROM usuarios WHERE telefono is not null  AND nombre is not null AND '+
            'apellido is not null AND tipo_documento is not null AND nro_documento is not'+
            ' null AND email is not null AND pais is not null and '+
            ' telefono !=\'\' AND nombre !=\'\' AND pais !=\'\' AND apellido !=\'\' AND tipo_documento !=\'\''+
            'AND email !=\'\' AND nro_documento !=\'\'  AND usuario=\'' +usuario.id+'\'';
            console.log(linea);
             
            conn.query(linea,(error,res1)=>{
                if(error)  { 
                    console.log(error)
                    resolve({status:742,msj:'Error al verificar usuario'});
                }
               
                const aux =(res1[0]);
                
               // console.log(res1);
               // console.log(aux['TextRow']);
               // console.log(aux.TextRow);
                if(aux.count == 0){
                    console.log(res1);  // hacer el service de esto y llamarlo
                    resolve({status:741,msj:'Usuario no verificado'});
                }else{
                    console.log('no');
                    resolve({status:742,msj:'Usuario verificado'});
                    
                }
                
            })
        })
    },
    disabledUsuario : function(req) { 
        const usuario =  req.usuario;
        return new Promise((resolve,reject)=>{
            User.update(
                {status:'inactivo'},
                { where:{ usuario : usuario,status:'active'},
                }
                )
            .then(
                res=>{
                    //console.log(res);
                    if(res == 1){
                        const resp ={
                            status:720,
                            msj:'Inhabilitación correcta.'
                        }
                       
                        resolve(resp);
                    }else{
                        const resp ={
                            status:721,
                            msj:'No se puedo inhabilitar al usuario.'
                        }
                    
                        resolve(resp);
                    }
                   
                }
            )
        })
    },
    validarPassword : function(req) { 
        console.log(req);
        const usuario =  req.usuario;
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        salt = salt+''+req.password;
        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
        return new Promise((resolve,reject)=>{
            User.findOne({ where:{ usuario : usuario,password: encPassword}})
            .then(
                res=>{
                    console.log(res);
                    if(res){
                        const resp ={
                            status:722,
                            msj:'Contraseña correcta.'
                        }
                
                        resolve(resp);
                    }else{
                        const resp ={
                            status:723,
                            msj:'No se pudo comprobar la contraseña.'
                        }
                   
                        resolve(resp);
                    }
                   
                }
            )
        })
    },
    
    getUserForUser : function(usuario) { 
        return new Promise((resolve,reject)=>{
            User.findOne({ where:{ usuario : usuario}})
            .then(
                res=>{
                    
                    resolve(res);
                }
            )
        })
    },
    updateSaldo : function(nuevoSaldo,viejoSaldo,id_user) { 
        return new Promise((resolve,reject)=>{
            console.log(nuevoSaldo+'   '+viejoSaldo+'   '+id_user);
            User.update(
                {   saldo: nuevoSaldo},
                    { where:{ id :  id_user,saldo:viejoSaldo}}
            ).then(
                res=>{
                    console.log(res);
                    if(res==0){
                        resolve({status:737,title:'Error',text:'El saldo previo no coincide, por favor generá devuelta la transacción'});
                    }else{
                        resolve({status:738,title:'Transferencia exitosa',text:'Ahora toca esperar la confirmación'});
                    }
                }
            )
        })
    },
    updateUsuario : function(usuario) { 
        return new Promise((resolve,reject)=>{
            console.log('usuarioooo');
            console.log(usuario);
            const linea  = 'UPDATE usuarios SET nombre=?,apellido=?,tipo_documento=?,nro_documento=?'+
                            ',telefono=?,email=?,pais=? WHERE usuario=?'
            conn.query(linea,[usuario.nombre,usuario.apellido,usuario.tipo_documento,usuario.nro_documento,
                usuario.telefono,usuario.email,usuario.pais,usuario.usuario],(err,res)=>{
                if(err) {console.log(err)}
                const actualizado=res.affectedRows;
                if(actualizado==0){

                    const resp ={
                        status:725,
                         msj:'Hubo un problema al correcta.'
                    }
                 resolve(resp);
                }else{
                    const resp ={
                        status:724,
                        msj:'Actualizacion correcta.'
                   }
                        resolve(resp);
                }
                resolve(res);
            })
            // User.update({ pais: usuario.pais},{ where:  { usuario : usuario.usuario}});
            // User.update(
            //     {    nombre: usuario.nombre,   
            //          apellido:usuario.apellido, 
            //          email:  usuario.email,    
            //          telefono:usuario.telefono,
                      
            //          tipo_documento:usuario.tipo_documento,
            //          nro_documento:usuario.nro_documento},
            //     { where:
            //         { usuario : usuario.usuario}}
            //         )
            // .then(
            //     res=>{
            //         if(res==1){
            //             const resp ={
            //                 status:724,
            //                 msj:'Actualizacion correcta.'
            //             }
                     
            //             resolve(resp);
            //         }else{
            //             const resp ={
            //                 status:725,
            //                 msj:'Hubo un problema al correcta.'
            //             }
                 
            //             resolve(resp);
            //         }
            //         console.log(res);
                   
            //         resolve(res);
            //     }
            // )
            // .catch(
            //     err=>{console.log(err);}
            // )
        })
    },
    // addUsuario: function(usuario){
    //     const usuario = new User();
    //     //usuario.se
        
    // }
}
