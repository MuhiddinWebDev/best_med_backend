const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class PillModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

PillModel.init({ 
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(300),
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'pill',
  tableName: 'pill',
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

module.exports = PillModel;