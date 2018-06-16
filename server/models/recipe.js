import categories from '../../shared/categories';

const recipeModel = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: 'Recipe name must be minimum 3 and maximum 30 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Recipe name is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'others',
      isIn: {
        args: [categories],
        msg: 'Invalid category type selected'
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Recipe.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Recipe.hasMany(models.Review, {
          foreignKey: 'recipeId',
          as: 'reviews'
        });
        Recipe.hasMany(models.Favorite, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Recipe;
};

export default recipeModel;
