"use strict";
const { Model } = require("sequelize");
const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  class VirtualAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VirtualAccount.init(
    {
      account_number: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      account_name: DataTypes.STRING,
      account_balance: DataTypes.STRING,
      account_denomination: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VirtualAccount",
    }
  );
  return VirtualAccount;
};
