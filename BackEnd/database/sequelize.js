const Sequelize = require('sequelize')

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