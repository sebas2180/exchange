
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var bancos = sequelize.define('bancos', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.STRING,
                notEmpty: true
              }
            },
            {
            tableName: 'bancos'
          });
     
        return bancos;
     
    }