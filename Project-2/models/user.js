module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        isEmail: true
      }

    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len: [8,20]
      }
    }
  });

  // associating user with board 
  // this just states that a user can have multiple boards 

  User.associate = function(models) {
    User.hasMany(models.Board, {
    }); 
  }; 
  return User;
};
