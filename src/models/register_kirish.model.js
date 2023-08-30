const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db-sequelize");
class register_kirish extends Model {
  toJSON() {
    //Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

register_kirish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(),
    },
    price: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },
    mashina_price: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },
    mashina_soni: {
      type: DataTypes.DECIMAL,
    },
    odam_soni: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },
    doc_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "register_kirish",
    tableName: "register_kirish",
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
module.exports = register_kirish;
