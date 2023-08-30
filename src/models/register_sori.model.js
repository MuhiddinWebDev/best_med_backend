const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const soriModel = require('./sori.model');
class register_soriModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

register_soriModel.init({
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
   type: DataTypes.DECIMAL(),
   allowNull: false
 },
 doc_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
doc_type: {
  type: DataTypes.STRING()
}

}, {
  sequelize,
  modelName: 'register_sori',
  tableName: 'register_sori',
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
 
});
register_soriModel.belongsTo(soriModel, {as: 'sori', foreignKey: 'doc_id'})
module.exports = register_soriModel;