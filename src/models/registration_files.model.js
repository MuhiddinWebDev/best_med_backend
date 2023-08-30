const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const Registration_doctorModel = require('./registration_doctor.model');
const filialModel = require('./filial.model');
class Registration_filesModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_filesModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
registration_id: {
    type: DataTypes.INTEGER
},
filial_id:{
  type: DataTypes.INTEGER
},
href : {
    type: DataTypes.STRING(300),
    allowNull: false
}

}, {
  sequelize,
  modelName: 'registration_files',
  tableName: 'registration_files',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ],
  //findOne da yoki findAll da chaqirish kerak
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    }
  }
});
Registration_doctorModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
module.exports = Registration_filesModel;