const express = require('express');
const http = require('http');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const body_parser = require('body-parser');
const morgan = require('morgan');

const dbConnection = require('./database/mysql');
const conn  = dbConnection.dbConnection();

const server = http.createServer(app);
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.set('port',process.env.port||9000);
app.use(express.static(path.join(__dirname,'public')));


////passport
require('./passport/auth.js')(app,passport);
var crypto            = require('crypto');
var LocalStrategy     = require('passport-local').Strategy;

var sess              = require('express-session');
var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);

var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
   name: 'JSESSION',
   secret: 'MYSECRETISVERYSECRET',
   store:  store,
   resave: true,
   saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
////
const usuarioRoute= require('./src/routes/usuarioRoute')(app,passport);
const depositoRoute= require('./src/routes/depositoRoutes')(app,passport);
server.listen(3000,()=>{
    console.log('server conectado en el puerto: '+server.address().port);
});