const recipeModel = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
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
        },
        is: {
          args: /^[A-Za-z0-9]+$/gi,
          msg: 'Title must contain letter and numbers only',
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
      }
    }
  });
  return Recipe;
};

export default recipeModel;
