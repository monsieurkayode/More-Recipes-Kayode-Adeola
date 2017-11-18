const reviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        });
        Review.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Review;
};

export default reviewModel;
