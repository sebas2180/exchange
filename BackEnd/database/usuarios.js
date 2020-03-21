
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var usuarios = sequelize.define('usuarios', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
          
            usuario: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            password: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            nombre: {
                type: Sequelize.STRING,
                notEmpty: true
            },
          
            apellido: {
                type: Sequelize.STRING,
                notEmpty: true
            },
           
            telefono: {
                type: Sequelize.INTEGER,
                type: Sequelize.DATE
            },
          
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
          
          
            saldo: {
                type: Sequelize.FLOAT,
                type: Sequelize.DATE
            },
            pais: {
                type: Sequelize.STRING,
                type: Sequelize.DATE
            }, 
             createdAt: {
              type: Sequelize.DATE, 
              field: 'create_at'
            } ,
            rol: {
                type: Sequelize.STRING,
                type: Sequelize.DATE
            }
          },
          {
            tableName: 'usuarios'
          });
     
        return usuarios;
     
    }