const Sequelize = require('sequelize')

// const sequelize = new Sequelize('heroku_3f3fe830ae5ac81', 'bb4140aeaa24a0', 'af327668', {
//   dialect: 'mysql',
//   host: 'us-cdbr-iron-east-01.cleardb.net',
//   define: {
//     timestamps: false
// }
// });


//const sequelize = new Sequelize('database', 'username', 'password', {
  sequelize = new Sequelize('exchange', 'doadmin', 'vj4gdmbs9si2agwj', {
    dialect: 'mysql',
    port : 25060,
    host: 'db-mysql-nyc1-18623-do-user-6877514-0.a.db.ondigitalocean.com',
    logging: false,
    define: {
      timestamps: false,
      
  }
  });


sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log(err)
  })

module.exports=sequelize;
global.sequelize=sequelize;