const { DataTypes, Model, VIRTUAL } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const palataModel = require('./palata.model')
class registration_palata_arxivModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

registration_palata_arxivModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 palata_id: {
   type: DataTypes.INTEGER(40),
 },
 price:{
   type: DataTypes.DECIMAL(),
   allowNull: false
 },
 registration_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
user_id:{
  type: DataTypes.INTEGER
},
filial_id:{
  type: DataTypes.INTEGER
},
total_price:{
  type: DataTypes.DECIMAL
},
date_do:{
  type: DataTypes.INTEGER
},
status: DataTypes.VIRTUAL,

}, {
  sequelize,
  modelName: 'registration_palata_arxiv',
  tableName: 'registration_palata_arxiv',
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
// palataModel.hasMany(registration_palata_arxivModel, {as: 'palatas', foreignKey: 'palata_id'});
registration_palata_arxivModel.belongsTo(palataModel, {as:'palatas', foreignKey: 'palata_id'});
module.exports = registration_palata_arxivModel;