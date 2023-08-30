const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const filialModel = require('./filial.model')
class RoomModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

RoomModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  filial_id:{
    type: DataTypes.INTEGER()
  }

}, {
  sequelize,
  modelName: 'room',
  tableName: 'room',
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
// RoomModel.hasMany(UserModel, {as: 'users', foreignKey: 'room_id'});
RoomModel.belongsTo(filialModel, {as: 'filial', foreignKey: 'filial_id'})
module.exports = RoomModel;