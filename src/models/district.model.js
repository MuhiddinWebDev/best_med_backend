const { DataTypes, Model } = require('sequelize');
const RegionModel = require('../models/region.model')
const sequelize = require('../db/db-sequelize');
class districtModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

districtModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
region_id : {
    type: DataTypes.INTEGER,
},
name: {
    type: DataTypes.STRING(60),
}

}, {
  sequelize,
  modelName: 'district',
  tableName: 'district',
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
});
RegionModel.hasMany(districtModel, {as: 'district', foreignKey: 'region_id'});
module.exports = districtModel;