const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection = require('../models/inspection.model');
const inspectionChildModel = require('./inspectionChild.model');
const Registration_inspection_childModel = require('./registration_inspection_child.model');
const filialModel = require('./filial.model');
class Registration_inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspectionModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  inspection_id: {
      type: DataTypes.INTEGER
  },
  user_id:{
    type: DataTypes.INTEGER
  },
  registration_id : {
      type: DataTypes.INTEGER
  },
  type:{
      type:DataTypes.BOOLEAN,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
//inspection_category
  category_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(200),
      allowNull: false
  },
  filial_id:{
    type: DataTypes.INTEGER
  },
  date_time:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  skidka:{
    type: DataTypes.DECIMAL
  }
}, {
  sequelize,
  modelName: 'registration_inspection',
  tableName: 'registration_inspection',
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
Registration_inspectionModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'});
Registration_inspectionModel.belongsTo(inspection, {as: 'inspection', foreignKey: 'inspection_id'})
Registration_inspectionModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'parent_id'})
// Registration_inspectionModel.hasMany(RegistrationModel, {as: 'registration', foreignKey: 'registration_id'})
module.exports = Registration_inspectionModel;