const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const pillModel = require('./pill.model')
class Registration_recipe_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_recipe_arxivModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
//registration_doctor id
registration_doctor_id: {
      type: DataTypes.INTEGER
  },
  registration_id: {
      type: DataTypes.INTEGER
  },
  pill_id : {
      type: DataTypes.INTEGER
  },
  time:{
      type: DataTypes.INTEGER
  },
  day:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  filial_id:{
    type: DataTypes.INTEGER
  },
  comment:{
      type: DataTypes.STRING,
      allowNull: false
  },
  name:{
    type: DataTypes.STRING()
  }
}, {
  sequelize,
  modelName: 'registration_recipe_arxiv',
  tableName: 'registration_recipe_arxiv',
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
Registration_recipe_arxivModel.hasMany(pillModel, {as: 'pill', foreignKey: 'id'})
module.exports = Registration_recipe_arxivModel;