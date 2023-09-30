'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('register_supplier', 'comment', {
        type: 'string',
        allowNull: true,
        defaultValue: ""
      });

      await queryInterface.addColumn('pastavchik_pay', 'comment', {
          type: 'string',
          allowNull: true,
          defaultValue: ""
      });
    } catch (errors) {
      throw errors;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('register_supplier', 'comment');
    await queryInterface.removeColumn('pastavchik_pay', 'comment');
  }
};

