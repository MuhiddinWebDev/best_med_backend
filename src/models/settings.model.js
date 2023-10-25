const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class SettingsModel extends Model {}

SettingsModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    rules: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING(200),
    },
    date1: {
        type: DataTypes.INTEGER,
    },
    date2: {
        type: DataTypes.INTEGER,
    },
    quote: {
        type: DataTypes.STRING(200),
    },
    header_left: {
        type: DataTypes.STRING(200),
    },
    header_right: {
        type: DataTypes.STRING(200),
    }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'SettingsModel', // We need to choose the model name
  tableName: 'settings',
  timestamps: false,
});
module.exports = SettingsModel;