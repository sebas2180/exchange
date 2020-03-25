
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var tasas = sequelize.define('tasas', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pais: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            tasa_actual: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
             
             createdAt: {
              type: Sequelize.DATE 
              ,field: 'create_at'
            } 
          },
          {
            tableName: 'tasas'
          });
     
        return tasas;
     
    }