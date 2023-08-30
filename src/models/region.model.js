const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DistrictModel = require('../models/district.model')
class RegionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

RegionModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'region',
  tableName: 'region',
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
// RegionModel.has(DistrictModel, {as: 'district', foreignKey: 'region_id'});
module.exports = RegionModel;