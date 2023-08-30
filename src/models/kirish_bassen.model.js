const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class kirish_bassenModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

kirish_bassenModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
price: {
    type: DataTypes.DECIMAL(),
    allowNull: false
}

}, {
  sequelize,
  modelName: 'bassen_summa',
  tableName: 'bassen_summa',
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
module.exports = kirish_bassenModel;