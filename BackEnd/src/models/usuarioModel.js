
const mysql = require('../../database/mysql');
const User = require('../../database/usuarios')();
const conn = mysql.dbConnection();

module.exports = {
    getUsuarios : function() { 
        
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
    addUsuario: function(usuario){
        
    }
}
