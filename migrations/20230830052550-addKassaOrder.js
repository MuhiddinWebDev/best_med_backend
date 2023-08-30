'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('kassa_order', 'filial_id', {
        type: 'int',
        allowNull: false,
        defaultValue: 0
      });

      await queryInterface.addColumn('kassa_order', 'kasser_id', {
        type: 'int',
        allowNull: true,
        defaultValue: 0
      });

    } catch (errors) {
      throw errors;
    }
  },

};

