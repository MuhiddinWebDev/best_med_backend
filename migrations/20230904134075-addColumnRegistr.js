'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('registration', 'filial_id', {
          type: 'int',
          allowNull: false,
      });

      await queryInterface.addColumn('registration_arxiv', 'filial_id', {
        type: 'int',
        allowNull: false,
    });

    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('registration', 'filial_id');
    await queryInterface.removeColumn('registration_arxiv', 'filial_id');
  }
};

