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
    timestamps: true,
    createdAt: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
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
