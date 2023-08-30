const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection = require('./inspection.model');
const inspectionChildModel = require('./inspectionChild.model');
const Registration_inspection_child_arxxivModel = require('./registration_inspection_child_arxiv.model');
class Registration_inspection_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspection_arxivModel.init({
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
//inspection_category
  category_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(20),
      allowNull: false
  },
  filial_id:{
    type: DataTypes.INTEGER
  },
  skidka:{
    type: DataTypes.DECIMAL
  }
}, {
  sequelize,
  modelName: 'registration_inspection_arxiv',
  tableName: 'registration_inspection_arxiv',
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
// Registration_inspection_arxivModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'id'});
Registration_inspection_arxivModel.belongsTo(inspection, {as: 'inspection', foreignKey: 'inspection_id'})
Registration_inspection_arxivModel.hasMany(Registration_inspection_child_arxxivModel, {as: 'registration_inspection_child', foreignKey: 'parent_id'})
module.exports = Registration_inspection_arxivModel;