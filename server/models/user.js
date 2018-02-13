import bcrypt from 'bcrypt';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists',
      },
      validate: {
        len: {
          args: [3, 30],
          msg: 'Username must be minimum 3 and maximum 30'
        },
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          arg: true,
          msg: 'Invalid email address',
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'First name must be minimum 3 and maximum 30 letters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: 'Last name must be minimum 3 and maximum 30 letters'
        }
      }
    },
    bio: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    dashCtrlImageUrl: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
      beforeUpdate: (user) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
    classMethods: {
      associate(models) {
        User.hasMany(models.Recipe, {
          foreignKey: 'userId',
          as: 'recipes'
        });
        User.hasMany(models.Review, {
          foreignKey: 'userId',
          as: 'reviews'
        });
        User.hasMany(models.Favorite, {
          foreignKey: 'userId',
          as: 'favoriteRecipes'
        });
      }
    }
  });
  return User;
};

export default userModel;
