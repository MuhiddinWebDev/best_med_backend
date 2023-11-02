"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("reagent_department", "comment", {
        type: "string",
        allowNull: true,
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("reagent_department", "comment");
  },
};
