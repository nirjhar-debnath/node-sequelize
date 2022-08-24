'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{
      name:'Admin',
      createdAt: '2022-08-24T10:48:13.888Z',
      updatedAt: '2022-08-24T10:48:13.888Z'
    }, {
      name:'Owner',
      createdAt: '2022-08-24T10:48:13.888Z',
      updatedAt: '2022-08-24T10:48:13.888Z'
    }, {
      name:'Developer',
      createdAt: '2022-08-24T10:48:13.888Z',
      updatedAt: '2022-08-24T10:48:13.888Z'
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
