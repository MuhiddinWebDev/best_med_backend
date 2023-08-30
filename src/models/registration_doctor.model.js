const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
const DoctorCategory = require('../models/doctor_category.model');
const Registration_recipeModel = require('./registration_recipe.model');
const register_mkb = require('./register_mkb.model');
class Registration_doctorModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}
Registration_doctorModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  doctor_id: {
      type: DataTypes.INTEGER
  },
  registration_id : {
      type: DataTypes.INTEGER
  },
  status:{
      type:DataTypes.STRING(200),
      allowNull: false
  },
  price:{
      type: DataTypes.DECIMAL(),
      allowNull: false
  },
  text:{
      type:DataTypes.STRING,
      allowNull: false
},
filial_id:{
  type: DataTypes.INTEGER
},
date_time:{
  type: DataTypes.STRING(),
  allowNull: false
}
}, {
  sequelize,
  modelName: 'registration_doctor',
  tableName: 'registration_doctor',
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
Registration_doctorModel.hasMany(register_mkb, {as:'register_mkb', foreignKey: 'registration_id'})
// Registration_recipeModel.hasOne(Registration_doctorModel, {as: 'registration_recipe', foreignKey: 'registration_doctor_id'})
Registration_doctorModel.hasMany(Registration_recipeModel, {as: 'registration_recipe',  foreignKey: 'registration_doctor_id'})
Registration_doctorModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
Registration_doctorModel.belongsTo(DoctorCategory, {as: 'doctor_category', foreignKey: 'id'});
module.exports = Registration_doctorModel;