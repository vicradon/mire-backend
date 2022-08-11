"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount_tendered: {
        type: Sequelize.FLOAT.UNSIGNED,
      },
      amount_received: {
        type: Sequelize.FLOAT.UNSIGNED,
      },
      status: {
        type: Sequelize.STRING,
      },
      fee: {
        type: Sequelize.FLOAT.UNSIGNED,
      },
      receiver_wallet_alias: {
        type: Sequelize.STRING,
      },
      reference: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
