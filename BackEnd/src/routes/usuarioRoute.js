
const usuarioModel = require('../../src/models/usuarioModel');
//const mysql = require('../../database/mysql');
var crypto            = require('crypto');
const User = require('../../database/usuarios')();
//const conn = mysql.dbConnection();
    function usuarioRoute(app,passport){
    app.get('/getRol',isAuthenticated,(req,res,next)=>{
        usuarioModel.getRol(req.query.id_user)
        .then(
          resp=>{
            res.send(resp);
          }
        )
    });
    app.get('/panelUser',isAuthenticated, (req, res, next) => {
        res.render('profile');
    });
    app.get('/getUsuario',isAuthenticated, (req, res, next) => {
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
    app.get('/getAllUsers',isAuthenticated, (req, res, next) => {
      usuarioModel.getUsuarios()
      .then(
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
 
     app.get('/getUserForEmail',isAuthenticated, (req, res, next) => {
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
     app.get('/getUserForUser',isAuthenticated, (req, res, next) => {
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
        passport.authenticate('local', function(err, user, info) {
          if (err) { 
            return next(err); 
          }
          console.log(user['id']);
          if (!user){
            console.log('no logeado');
             { const devolver={
             status:702,
             success:'usuario no existente'
          }
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              
          return res.send(JSON.stringify(devolver)); }
          }else{
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              console.log('logeado');
              const devolver={
                status:703,
                success:'usuario logeado',
                user: user
              }
              res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              return res.send((devolver));
            });
          }       
        })(req, res, next);   
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
      // try{
      //   passport.authenticate('signup',(err,user,info)=>{
      //     if (err) { 
      //       return next(err); 
      //     }
      //   });
      // }catch(err){
      //   console.log(err);
      // }
    })
    app.get('/logout',isAuthenticated, (req, res, next) => {
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
    app.put('/addUsusario',(req,res) =>{
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

    app.get('/disabledUsuario',(req,res) =>{
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
  app.get('/validarPassword',(req,res) =>{
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
app.post('/updateUsuario',(req,res) =>{

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

  function isAuthenticated(req, res, next) {
            if (req.isAuthenticated())
            console.log('aut');
              return next();

        }
}

module.exports = usuarioRoute;