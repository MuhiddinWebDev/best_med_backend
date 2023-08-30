const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class inspectionChildModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

inspectionChildModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
norm : {
    type: DataTypes.STRING(200),
},
parent_id : {
    type: DataTypes.INTEGER,
},
price:{
    type:DataTypes.DECIMAL()
},
price:{
  type:DataTypes.DECIMAL()
},
citizen_price:{
  type:DataTypes.DECIMAL()
},
name: {
    type: DataTypes.STRING(200),
},
file: {
    type: DataTypes.STRING,
    // defaultValue:""
},
status: {
  type: DataTypes.VIRTUAL
},
birlik:{
  type: DataTypes.STRING
},
rang:{
  type: DataTypes.STRING
}

}, {
  sequelize,
  modelName: 'inspectionChild',
  tableName: 'inspectionChild',
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

module.exports = inspectionChildModel;