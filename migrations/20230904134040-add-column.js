'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('kassa_order', 'user_id', {
        type: 'int',
        allowNull: false,
        defaultValue: 0
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop the new column
    await queryInterface.removeColumn('kassa_order', 'user_id');
  }
};

