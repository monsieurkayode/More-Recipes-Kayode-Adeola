const voteModel = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    option: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Vote;
};

export default voteModel;
