
const DataTypes = require('mysql2');
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

      module.exports = ()=> {
 
        var beneficiario = sequelize.define('beneficiario', {
 
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
          
            nombre: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            apellido: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            tipo_cuenta: {
                type: Sequelize.STRING,
                notEmpty: true
            },
          
            nro_cuenta: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            tipo_documento: {
                type: Sequelize.STRING,
                notEmpty: true
            },
          
            nro_documento: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            banco: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            createAt: {

                type: Sequelize.DATE,
                field: 'create_at'
            },
          
            id_usuario: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
          },
          {
            tableName: 'beneficiario'
          });
     
        return beneficiario;
     
    }