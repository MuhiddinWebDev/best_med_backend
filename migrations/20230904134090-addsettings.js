"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("settings", "rules", {
        type: "string",
        allowNull: false,
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("settings", "rules");
  },
};
