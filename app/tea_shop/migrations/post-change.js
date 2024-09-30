'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Обновляем описание столбца description
    await queryInterface.changeColumn('posts', 'content', {
      type: Sequelize.STRING(1023),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Возвращаем столбец description к предыдущему состоянию (STRING(255))
    await queryInterface.changeColumn('posts', 'content', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  }
};
