// src/db/models/PathogenType.js

const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const { PATHOGEN_TYPE } = require("../../constants/disease-constant");

const PathogenType = sequelize.define("PathogenType", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.ENUM(Object.values(PATHOGEN_TYPE)),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    paranoid: true, // Soft delete, adds deletedAt field
    tableName: 'pathogen_types', // Set table name
    timestamps: true, // Enable createdAt and updatedAt fields
    underscored: true, // Use snake_case for database fields
});

// Synchronize the model with the database
PathogenType.sync()
    .then(() => console.log("PathogenType model synchronized with the database"))
    .catch(error => console.error("Error synchronizing PathogenType model:", error?.message || error));

// Export the PathogenType model
module.exports = PathogenType;
