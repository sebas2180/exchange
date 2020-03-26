
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var dashboard = sequelize.define('dashboard', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            nombre: {
                type: Sequelize.STRING,
                notEmpty: false
              },
            create_at: {
                type: Sequelize.STRING,
                notEmpty: false,
                field: 'create_at'
              },
            imagen: {
                type: Sequelize.BLOB,
                notEmpty: true
              }
            },  
            {
            tableName: 'dashboard'
          });
     
        return dashboard;
     
    }