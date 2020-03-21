
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var depositos = sequelize.define('depositos', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
          
            monto: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
            pais: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            status: {
                type: Sequelize.STRING,
                notEmpty: true
            },
          
            id_user: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
           
            fecha: {

                type: Sequelize.DATE
            },
          
            tasa: {
                type: Sequelize.FLOAT,
                defaultValue: 'active'
            },
          
          
            id_destinatario: {
                type: Sequelize.INTEGER
            }
          },
          {
            tableName: 'depositos'
          });
     
        return depositos;
     
    }