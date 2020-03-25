
//const mysql = require('../../database/mysql');
const User = require('../../database/usuarios')();
//const conn = mysql.dbConnection();
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
    updateUsuario : function(usuario) { 
        return new Promise((resolve,reject)=>{
            User.update(
                {nombre: usuario.nombre,   apellido:usuario.apellido, 
                 email:  usuario.email,    pais:usuario.pais,
                 telefono:usuario.telefono},
                { where:{ usuario : usuario.usuario}})
            .then(
                res=>{
                    if(res==1){
                        const resp ={
                            status:724,
                            msj:'Actualizacion correcta.'
                        }
                     
                        resolve(resp);
                    }else{
                        const resp ={
                            status:725,
                            msj:'Hubo un problema al correcta.'
                        }
                 
                        resolve(resp);
                    }
                    console.log(res);
                   
                    resolve(res);
                }
            )
        })
    },
    // addUsuario: function(usuario){
    //     const usuario = new User();
    //     //usuario.se
        
    // }
}
