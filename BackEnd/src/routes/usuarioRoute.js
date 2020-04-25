
const usuarioModel = require('../../src/models/usuarioModel');
var crypto            = require('crypto');
const User = require('../../database/usuarios')();
const mysql = require('../../database/mysql');
const connection = mysql.dbConnection();
 
  function usuarioRoute(app,passport){
    app.get('/getRol',verifyToken.verificar,(req,res,next)=>{
        usuarioModel.getRol(req.query.id_user)
        .then(
          resp=>{
            res.send(resp);
          }
        )
    });

    app.get('/panelUser',verifyToken.verificar, (req, res, next) => {
        res.render('profile');
    });


    app.get('/getUsuario',verifyToken.verificar, (req, res, next) => {
     resp =usuarioModel.getUsuario(req.query.id)
     .then(
       resp=>{
        if(!resp){
          console.log('null');
          const sendInfo={
              status: 709,
              msj: 'Ops!.No se encontraron el usuario',
              beneficiario: ''
            }
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            return res.end(JSON.stringify(sendInfo));
      }else{
        const sendInfo={
          status: 710,
          msj: 'Perfecto!, se han encontrado usuario',
          usuario: resp
        }

        
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        return res.end(JSON.stringify(sendInfo));
       }
      }
     )
    });


    app.get('/getAllUsers',verifyToken.verificar, (req, res, next) => {
      usuarioModel.getUsuarios().then(
        resp=>{
         if(!resp){
           const sendInfo={
               status: 713,
               msj: 'Ops!.No se encontraron usuarios',
               usuarios: ''
             }
             res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
             return res.end(JSON.stringify(sendInfo));
       }else{
         const sendInfo={
           status: 714,
           msj: 'Perfecto!, se han encontrado usuarios',
           usuarios: resp
         }    
         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
         return res.end(JSON.stringify(sendInfo));
        }
       }
      )
     });
 
     app.get('/getUserForEmail',verifyToken.verificar, (req, res, next) => {
      resp =usuarioModel.getUserForEmail(req.query.email)
      .then(
        resp=>{
         if(!resp){
           console.log('null');
           const sendInfo={
               status: 715,
               msj: 'Ops!.No se encontraron usuario con el mail proporcionado',
               beneficiario: ''
             }
             res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
             return res.end(JSON.stringify(sendInfo));
       }else{
         const sendInfo={
           status: 716,
           msj: 'Perfecto!, se han encontrado usuario/s con el mail proporcionado',
           usuario: resp
         }
 
         
         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
         return res.end(JSON.stringify(sendInfo));
        }
       }
      )
 
       
     });
     app.get('/getUserForUser',verifyToken.verificar, (req, res, next) => {
      resp =usuarioModel.getUserForUser(req.query.usuario)
      .then(
        resp=>{
         if(!resp){
           console.log('null');
           const sendInfo={
               status: 717,
               msj: 'Ops!.No se encontraron usuario con el usuario proporcionado',
               beneficiario: ''
             }
             res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
             return res.end(JSON.stringify(sendInfo));
       }else{
         const sendInfo={
           status: 718,
           msj: 'Perfecto!, se han encontrado usuario/s con el usuario proporcionado',
           usuario: resp
         }
 
         
         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
         return res.end(JSON.stringify(sendInfo));
        }
       }
      )
 
       
     });
    app.post('/login', function(req, res, next) {
      console.log(req.body);
      usuario = {
        usuario :req.body.usuario,
        password: req.body.password
      }
      var linea = "SELECT * FROM usuarios WHERE usuario =\'"+usuario.usuario+'\'';
      //console.log('linea:    '+linea);
      connection.query(linea,    function(err, rows){ 
        if(err) { console.log( err ); }
          console.log(rows);
        if(rows){
          if(!rows[0]){ 
            console.log('no logeadoo');
            const devolver={
                status:702,
                success:'usuario no existente'
            }    
            return res.end(JSON.stringify(devolver));
          }else{
           // console.log('password  :  '+usuario.password);
            var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
            salt = salt+''+usuario.password;
            var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
            var dbPassword  = rows[0].password;
           //console.log(dbPassword);
            //console.log(encPassword);
            if((dbPassword == encPassword)){
              verifyToken.login(req.body.usuario,req.body.rol,(token)=>{
               
                const devolver={
                  status:703,
                  success:'usuario logeado',
                  user: usuario.usuario,
                  id:  rows[0]['id'],
                  token: token,
                  rol: rows[0]['rol']
                }
                console.log(devolver)
                return res.end(JSON.stringify(devolver));
               })
             }else{
              //console.log('no logeado');
              const devolver={
                  status:702,
                  success:'usuario no existente'
              }    
              return res.end(JSON.stringify(devolver));
        }
        }
        }
    });
  });

    app.put('/signup',function(req,res,next){
      console.log(req.body);   
      User.findOne({     where: {  usuario: req.body.usuario      }     })
      .then(
        user=>{
          if(user) {
            const resp= {
              status:750,
              msj:"Nombre de usuario ya utilizado"
            }
          }else{
            var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
            salt = salt+''+req.body.password;
            var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
            const newUser = new User();
            newUser.usuario= req.body.usuario;
            newUser.password = encPassword;
            newUser.pais= req.body.pais;
            newUser.email = req.body.email;
            newUser.creaeAt = req.body.create_at;
            newUser.saldo=req.body.saldo;
            newUser.tasa=1;
            newUser.rol = 'cliente';
            newUser.save();
            const resp= {
              status:750,
              msj:"Usuario creado con exito!"
            }
          }
          res.send(JSON.stringify(resp));
        }
      )
      .catch(
        err=>{
          console.log(err);
        }
      )
 
    })
    app.get('/logout',verifyToken.verificar, (req, res, next) => {
        console.log('desconexion');
        req.logout();
        req.session.destroy(function (err) {
          const sendInfo={
            status: 999,
            url:'Desconexion correcta'
          }
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
           return res.end(JSON.stringify(sendInfo.url));
      });
      });
    app.put('/addUsusario',verifyToken.verificar,(req,res) =>{
        usuarioModel.addUsuario(req.body)
        .then(
            resp=>{
                      console.log(resp);
                      return res.end(JSON.stringify(resp));
            }
        )
        .catch(
            err =>{
                console.log(err);
            }
        )
    });

    app.get('/disabledUsuario',verifyToken.verificar,(req,res) =>{
      usuarioModel.disabledUsuario(req.query)
      .then(
          resp=>{
              console.log(resp);
              return res.end(JSON.stringify(resp));
          }
      )
      .catch(
          err =>{
              console.log(err);
          }
      )
  });
  app.get('/validarPassword',verifyToken.verificar,(req,res) =>{
    console.log(req.query);
    usuarioModel.validarPassword(req.query)
    .then(
        resp=>{
            console.log(resp);
            return res.end(JSON.stringify(resp));
        }
    )
    .catch(
        err =>{
            console.log(err);
        }
    )
});
app.get('/usuarioVerificado',verifyToken.verificar,(req,res) =>{
  console.log(req.query);
  usuarioModel.usuarioVerificado(req.query)
  .then(
      resp=>{
          console.log(resp);
          return res.end(JSON.stringify(resp));
      }
  )
  .catch(
      err =>{
          console.log(err);
      }
  )
});
app.post('/updateUsuario',verifyToken.verificar,(req,res) =>{

  usuarioModel.updateUsuario(req.body)
  .then(
      resp=>{
          console.log(resp);
          return res.end(JSON.stringify(resp));
      }
  )
  .catch(
      err =>{
          console.log(err);
      }
  )
});
}

module.exports = usuarioRoute;