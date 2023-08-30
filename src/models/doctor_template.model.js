const { DataTypes, Model } = require('sequelize');
const DoctorModel = require('../models/doctor.model')
const sequelize = require('../db/db-sequelize');
class Doctor_templateModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Doctor_templateModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  doctor_id: {
      type: DataTypes.INTEGER,
  },
  complaint:{
      type: DataTypes.STRING
  },
  name:{
      type: DataTypes.STRING
  },
  medical_history:{
      type: DataTypes.STRING
  },
  objective_vision:{
      type: DataTypes.STRING
  },
  instrumental:{
      type:DataTypes.STRING
  },
  diagnos:{
      type:DataTypes.STRING
  },
  procedure:{
      type:DataTypes.STRING
  },
  recommended:{
      type:DataTypes.STRING
  },
  concomitant:{
      type:DataTypes.STRING
  }
},
{
  sequelize,
  modelName: 'doctor_template',
  tableName: 'doctor_template',
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
Doctor_templateModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
module.exports = Doctor_templateModel;