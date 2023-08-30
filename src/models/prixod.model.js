const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const pastavchikModel = require('./pastavchik.model');
const prixod_tableModel = require('./prixod_table.model');
class prixodModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

prixodModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
date_time : {
    type: DataTypes.INTEGER,
},
umumiy_summa: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
pastavchik_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
comment:{
  type: DataTypes.STRING
}

}, {
  sequelize,
  modelName: 'prixod',
  tableName: 'prixod',
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
prixodModel.hasMany(prixod_tableModel, {as: 'prixod_table', foreignKey: 'prixod_id'})
prixodModel.belongsTo(pastavchikModel, {as: 'pastavchik', foreignKey: 'pastavchik_id'})
module.exports = prixodModel;