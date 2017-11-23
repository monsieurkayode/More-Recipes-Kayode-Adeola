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
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: () => {
      }
    }
  });
  return Vote;
};

export default voteModel;
