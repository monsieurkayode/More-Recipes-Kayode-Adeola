const favoriteModel = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => {
        
      }
    }
  });
  return Favorite;
};

export default favoriteModel;
