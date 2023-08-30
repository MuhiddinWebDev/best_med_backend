const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const filialModel = require('./filial.model');
class directModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

directModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
bonus : {
    type: DataTypes.DECIMAL,
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
},
med_id: {
  type: DataTypes.INTEGER
},
filial_id:{
  type: DataTypes.INTEGER
}

}, {
  sequelize,
  modelName: 'direct',
  tableName: 'direct',
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
directModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
module.exports = directModel;