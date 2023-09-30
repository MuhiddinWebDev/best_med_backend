const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const pastavchikModel = require('./pastavchik.model')
class pastavchik_payModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

pastavchik_payModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
type : {
    type: DataTypes.BOOLEAN,
    allowNull: false
},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
backlog: {
  type: DataTypes.DECIMAL
},
comment: {
  type: DataTypes.TEXT,
  allowNull: true,
  defaultValue: ""
},
jami_summa: {
  type: DataTypes.DECIMAL
},
pastavchik_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
date_time:{
  type: DataTypes.INTEGER,
  allowNull: false
},
filial_id:{
  type: DataTypes.INTEGER
}

}, {
  sequelize,
  modelName: 'pastavchik_pay',
  tableName: 'pastavchik_pay',
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
pastavchik_payModel.belongsTo(pastavchikModel, {as: 'pastavchik', foreignKey: 'pastavchik_id'})
module.exports = pastavchik_payModel;