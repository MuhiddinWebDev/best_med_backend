const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class soriModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

soriModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'soriModel',
  tableName: 'sori',
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
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    }
  }
});
module.exports = soriModel;