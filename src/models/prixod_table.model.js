const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const reagentModel = require('./reagent.model')
class prixod_tableModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

prixod_tableModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
reagent_id : {
    type: DataTypes.INTEGER,
},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
count: {
  type: DataTypes.DECIMAL,
  allowNull: false
},
summa:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
prixod_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
datetime:{
  type: DataTypes.INTEGER,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'prixod_table',
  tableName: 'prixod_table',
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
prixod_tableModel.belongsTo(reagentModel, {as: 'reagent', foreignKey: 'reagent_id'})
module.exports = prixod_tableModel;