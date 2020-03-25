const Sequelize = require('sequelize')

// const sequelize = new Sequelize('heroku_3f3fe830ae5ac81', 'bb4140aeaa24a0', 'af327668', {
//   dialect: 'mysql',
//   host: 'us-cdbr-iron-east-01.cleardb.net',
//   define: {
//     timestamps: false
// }
// });


const sequelize = new Sequelize('exchange', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false
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