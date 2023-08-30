const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class shablon_doctorModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

shablon_doctorModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
doctor_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
name: {
    type: DataTypes.STRING(200),
    allowNull: false
},
text:{
  type: DataTypes.TEXT
}

}, {
  sequelize,
  modelName: 'shablon_doctor',
  tableName: 'shablon_doctor',
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
module.exports = shablon_doctorModel;