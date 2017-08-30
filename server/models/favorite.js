'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorite;
};