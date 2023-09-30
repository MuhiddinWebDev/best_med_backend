const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DirectModel = require('./direct.model');
const UserModel = require('./user.model');
const FilialModel = require('./filial.model');

class PayDirectModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

PayDirectModel.init({ 
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  datetime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direct_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sum: {
    type: DataTypes.DECIMAL(),
    allowNull: true,
    defaultValue: 0
  },
  pay_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  backlog: {
    type: DataTypes.DECIMAL(),
    allowNull: true,
    defaultValue: 0
  },
  filial_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ""
  }
}, {
  sequelize,
  modelName: 'pay_direct',
  tableName: 'pay_direct',
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
});

PayDirectModel.belongsTo(DirectModel, {as: 'direct', foreignKey: 'direct_id'})
PayDirectModel.belongsTo(UserModel, {as: 'user', foreignKey: 'user_id'})
PayDirectModel.belongsTo(FilialModel, {as: 'filial', foreignKey: 'filial_id'})
module.exports = PayDirectModel;