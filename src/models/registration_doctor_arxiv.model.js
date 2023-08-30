const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
const DoctorCategory = require('./doctor_category.model');
const Registration_recipeModel = require('./registration_recipe_arxiv.model');
class Registration_doctor_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}
Registration_doctor_arxivModel.init({
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
      type:DataTypes.STRING(20),
      allowNull: false
  },
  price:{
      type: DataTypes.DECIMAL(),
      allowNull: false
  },
  filial_id:{
    type: DataTypes.INTEGER
  },
  text:{
      type:DataTypes.STRING,
      allowNull: false
}
}, {
  sequelize,
  modelName: 'registration_doctor_arxiv',
  tableName: 'registration_doctor_arxiv',
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
// Registration_recipeModel.hasOne(Registration_doctor_arxivModel, {as: 'registration_recipe', foreignKey: 'registration_doctor_id'})
Registration_doctor_arxivModel.hasMany(Registration_recipeModel, {as: 'registration_recipe',  foreignKey: 'registration_doctor_id'})
Registration_doctor_arxivModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
Registration_doctor_arxivModel.belongsTo(DoctorCategory, {as: 'doctor_category', foreignKey: 'id'});
module.exports = Registration_doctor_arxivModel;