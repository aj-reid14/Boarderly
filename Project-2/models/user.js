module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("user", {
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

  user.associate = function(models) {
    user.hasMany(models.board, {

    }); 
  }; 
  return user;
};
