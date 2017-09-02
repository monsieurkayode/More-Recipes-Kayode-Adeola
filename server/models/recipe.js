const recipeModel = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Title must be minimum 3 and maximum 50 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Recipe.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Recipe.hasMany(models.Review, {
          foreignKey: 'recipeId',
          as: 'reviews'
        });
      }
    }
  });
  return Recipe;
};

export default recipeModel;
