const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class kirish_summaModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

kirish_summaModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
odam_price: {
    type: DataTypes.DECIMAL(),
    allowNull: false
},
moshina_price: {
  type: DataTypes.DECIMAL(),
  allowNull: false
},

}, {
  sequelize,
  modelName: 'kirish_summa',
  tableName: 'kirish_summa',
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
module.exports = kirish_summaModel;