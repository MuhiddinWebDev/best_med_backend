"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("queue", "filial_id", {
        type: "int",
        allowNull: false,
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("queue", "filial_id");
  },
};
