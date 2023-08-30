const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db-sequelize");
const directModel = require("./direct.model");
class register_directModel extends Model {
  toJSON() {
    //Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

register_directModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    date_time: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING(400),
    },
    price: {
      type: DataTypes.DECIMAL(),
    },
    doc_id: {
      type: DataTypes.INTEGER,
    },
    direct_id: {
      type: DataTypes.INTEGER,
    },
    doc_type: {
      type: DataTypes.STRING(),
    },
    comment: {
      type: DataTypes.STRING(),
    },
    filial_id: {
      type: DataTypes.INTEGER,
    },
    place: {
      type: DataTypes.STRING(),
    },
  },
  {
    sequelize,
    modelName: "register_direct",
    tableName: "register_direct",
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
register_directModel.belongsTo(directModel, {
  as: "direct",
  foreignKey: "direct_id",
});
module.exports = register_directModel;
