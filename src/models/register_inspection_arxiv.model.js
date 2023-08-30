const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const InspectionCategory = require('./inspector_category.model')
const RegistrationModel = require('./registration_arxiv.model')
class register_inspection_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

register_inspection_arxivModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 type: {
   type: DataTypes.STRING(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 user_id:{
  type: DataTypes.INTEGER
},
inspection_id:{
  type: DataTypes.INTEGER
},
inspection_category:{
  type: DataTypes.INTEGER,
},
doc_type:{
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
place:{
  type:DataTypes.STRING()
}

}, {
  sequelize,
  modelName: 'register_inspection_arxiv',
  tableName: 'register_inspection_arxiv',
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
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "doc_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "user_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "inspection_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "inspection_category" },
      ]
    }
  ],
});
register_inspection_arxivModel.belongsTo(InspectionCategory, {as: 'inspection', foreignKey: 'inspection_category'})
register_inspection_arxivModel.belongsTo(RegistrationModel, {as: 'registration', foreignKey: 'doc_id'})
module.exports = register_inspection_arxivModel;