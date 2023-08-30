const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Registration_inspection_child_arxxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspection_child_arxxivModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
//registration inspection
  parent_id: {
      type: DataTypes.INTEGER
  },
  text : {
      type: DataTypes.STRING,
  },
  norm:{
      type: DataTypes.STRING(),
      allowNull: false
  },
  name:{
      type: DataTypes.STRING(),
      allowNull: false
  },
  registration_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(),
  },
  price:{
      type: DataTypes.DECIMAL()
  },
  checked:{
      type: DataTypes.BOOLEAN,
  },
  file:{
      type: DataTypes.STRING(100),
  },
  birlik:{
    type: DataTypes.STRING
  },
  rang:{
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'registration_inspection_child_arxiv',
  tableName: 'registration_inspection_child_arxiv',
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

module.exports = Registration_inspection_child_arxxivModel;