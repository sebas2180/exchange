
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
            email: {
                type: Sequelize.STRING,
                notEmpty: true
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
                type: Sequelize.STRING,
                notEmpty: true
            },

            tipo_documento: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            nro_documento: {
                type: Sequelize.INTEGER
            },
          
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
          
          
            saldo: {
                type: Sequelize.FLOAT
            },
            tasa: {
                type: Sequelize.FLOAT
            },
            pais: {
                type: Sequelize.STRING
            }, 
             createdAt: {
              type: Sequelize.DATE, 
              field: 'create_at'
            } ,
            rol: {
                type: Sequelize.STRING
            }
          },
          {
            tableName: 'usuarios'
          });
     
        return usuarios;
     
    }