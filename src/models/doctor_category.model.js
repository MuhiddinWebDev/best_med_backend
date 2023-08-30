const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db-sequelize");
const filialModel = require("./filial.model");

class doctor_categoryModel extends Model {
  toJSON() {
    //Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

doctor_categoryModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },
    citizen_price: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },
    filial_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "doctor_category",
    tableName: "doctor_category",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
    //findOne da yoki findAll da chaqirish kerak
  }
  );
// doctor_categoryModel.belongsTo(filialModel, {as: "filiall", foreignKey: "filial_id",});
module.exports = doctor_categoryModel;
