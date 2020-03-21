

var flash             = require('connect-flash');
var crypto            = require('crypto');

var LocalStrategy     = require('passport-local').Strategy;

var Store             = require('express-session').Store;
const mysql = require('../database/mysql');
const User = require('.././database/usuarios')();
const connection = mysql.dbConnection();
 function ps(app,passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
      console.log('hola');
        connection.query("select * from usuarios where id = "+ id, function (err, rows){
            done(err, rows[0]);
        });
    });
    passport.use('local', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'password',
      passReqToCallback: true //passback entire req to call back
    } , function (req, usuario, password, done){
      console.log(usuario);
          if(!usuario || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
          var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
          console.log("select * from usuarios where usuario = ?", [usuario]);
          connection.query("select * from usuarios where usuario = ?", [usuario], function(err, rows){ 
              console.log(rows);
            if (err) return done(req.flash('message',err));
            if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
            salt = salt+''+password;
           
            var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
            var dbPassword  = rows[0].password;
            console.log(dbPassword);
            console.log(encPassword);
            if(!(dbPassword == encPassword)){
                return done(null, false, req.flash('message','Invalid username or password.'));
             }
            return done(null, rows[0]);
          });
        }
    ));
    passport.use('signup', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'password',
      passReqToCallback: true
    }, 
    async (req, usuario, password, done) => {
      const user = await  User.findOne({
        where: {  usuario: 'sebas'      }     });
      console.log(user);
      if(user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
      } else {
        const newUser = new User();
        newUser.email = email;
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        var userPassword = crypto.createHash('sha1').update(salt).digest('hex');
        //         console.log('salt');
        newUser.password = userPassword;
      console.log(newUser)
        await newUser.save();
        done(null, newUser);
      }
    }));
  //   passport.use('local-signup', new LocalStrategy( 
  //     {
  //         usernameField: 'usuario',
  //         passwordField: 'password',
  //         session: false,
  //         passReqToCallback: true // allows us to pass back the entire request to the callback
  //     },(req, usuario, password, done) =>{
  //         console.log(usuario);
  //         var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  //         console.log('salt');
  //         await User.findOne({'usuario': usuario})
  //         .then(function(user) {
  //             if (user){
  //                 return done(null, false, {
  //                     message: 'That email is already taken'
  //                 });
  //             } else
  //             {

  //                 var userPassword = crypto.createHash('sha1').update(salt).digest('hex');
  //                 var data = {
  //                         usuario: usuario,
  //                         password: password,
  //                         nombre: req.body.firstname,
  //                         apellido: req.body.lastname,
  //                         telefono:req.body.telefono,
  //                         status:'ACTIVO',
  //                         saldo:0,
  //                         pais:req.body.pais,
  //                         create_at:req.body.create_at,
  //                         rol:req.body.rol

  //                     };
  //                 User.create(data)
  //                 .then(function(newUser, created) {
  //                     if (!newUser) {
  //                         return done(null, false);
  //                     }
  //                     if (newUser) {
  //                         return done(null, newUser);
  //                     }
  //                 });

  //             }

  //         });

  //     }

  // ));

  }
      module.exports = ps;
