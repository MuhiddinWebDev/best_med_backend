'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('reagent_department', 'user_id', {
          type: 'int',
          allowNull: false,
      });

      await queryInterface.addColumn('reagent_department', 'datetime', {
        type: 'int',
        allowNull: false,
    });

    await queryInterface.addColumn('reagent_department', 'filial_id', {
        type: 'int',
        allowNull: false,
    });

    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('reagent_department', 'user_id');
    await queryInterface.removeColumn('reagent_department', 'datetime');
    await queryInterface.removeColumn('reagent_department', 'filial_id');
  }
};

