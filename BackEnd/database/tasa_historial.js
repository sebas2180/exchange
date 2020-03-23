
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var tasa_historial = sequelize.define('tasa_historial', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_pais: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
            cotizacion: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
             
             createdAt: {
              type: Sequelize.DATE, 
              field: 'create_at'
            } 
          },
          {
            tableName: 'historial_cotizaciones'
          });
     
        return tasa_historial;
     
    }