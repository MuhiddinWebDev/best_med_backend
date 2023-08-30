const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db-sequelize");
class med_directModel extends Model {
  toJSON() {
    //Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

med_directModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.DECIMAL,
    },
    name: {
      type: DataTypes.STRING(600),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "med_direct",
    tableName: "med_direct",
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
module.exports = med_directModel;
