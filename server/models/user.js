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
        is: {
          args: /^[A-Za-z0-9]+$/gi,
          msg: 'Username must contain letter and numbers only',
        }
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
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

export default userModel;
