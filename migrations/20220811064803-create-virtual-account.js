"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VirtualAccounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      account_number: {
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
      account_name: {
        type: Sequelize.STRING,
      },
      account_balance: {
        type: Sequelize.STRING,
      },
      account_denomination: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("VirtualAccounts");
  },
};
