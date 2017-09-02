module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }),
  down: queryInterface => queryInterface.dropTable('Favorites')
};
