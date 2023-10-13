"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("prixod_table", "datetime", {
        type: "int",
        allowNull: false,
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("prixod_table", "datetime");
  },
};
