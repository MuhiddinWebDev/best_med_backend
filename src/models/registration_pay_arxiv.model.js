const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Registration_pay_arxivModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_pay_arxivModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  registration_id: {
      type: DataTypes.INTEGER
  },
  user_id: {
      type: DataTypes.INTEGER
  },
  pay_type : {
      type: DataTypes.STRING(),
      allowNull: false
  },
summa:{
      type: DataTypes.DECIMAL(),
      allowNull: false
  },
  date_time:{
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(new Date().getTime() / 1000)
    },
    discount:{
      type: DataTypes.DECIMAL
    },
    umumiy_sum:{
      type: DataTypes.DECIMAL
    },
    backlog:{
      type: DataTypes.DECIMAL
    },
    comment:{
      type: DataTypes.STRING
    },
    filial_id:{
      type: DataTypes.INTEGER
    }
}, {
  sequelize,
  modelName: 'registration_pay_arxiv',
  tableName: 'registration_pay_arxiv',
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

module.exports = Registration_pay_arxivModel;