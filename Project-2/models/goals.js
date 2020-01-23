module.exports = function(sequelize, DataTypes) {
const Goals = sequelize.define("Goals", {
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 40]
        }
    },
    image: {
        type: DataTypes.STRING
    }
});
// stating each goal should belong to one board and 
// cannot be created without a board because of foreign key constraint

Goals.associate = function(models) {

    Goals.belongsTo(models.Board, {
        foreignKey: {
            allowNull: false
        }
    });
}


return Goals;
};