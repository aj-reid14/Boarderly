module.exports = function (sequelize, DataTypes) {
    const Board = sequelize.define("Board", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
            // add any extra validation 
        }, 
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Board.associate = function(models) {

        // associating board with goals 
        // goals are deleted when board is deleted 

        Board.hasMany(models.Goals, {
            onDelete: "cascade" 
        });

        // stating a board should belong to a user and 
        // cannot be created without a user because of foreign key constraint
        
        Board.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Board;
};