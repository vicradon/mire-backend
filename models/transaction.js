"use strict";
const { Model } = require("sequelize");
const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const userAssociation = this.belongsTo(models.User);
    }
  }
  Transaction.init(
    {
      amount_tendered: DataTypes.FLOAT.UNSIGNED,
      amount_received: DataTypes.FLOAT.UNSIGNED,
      status: DataTypes.STRING,
      fee: DataTypes.FLOAT.UNSIGNED,
      receiver_wallet_alias: DataTypes.STRING,
      reference: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
