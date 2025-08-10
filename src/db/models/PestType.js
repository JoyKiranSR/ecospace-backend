// src/db/models/PestType.js

// Core module imports
const { DataTypes } = require("sequelize");

// Custom module imports
const sequelize = require("../../db/index");
const { PEST_TYPE } = require("../../constants/pest-constant");

const PestType = sequelize.define("PestType", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.ENUM(Object.values(PEST_TYPE)),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    tableName: "pest_types", // Custom table name
    timestamps: true, // Adds createdAt and updatedAt
    underscored: true, // Snakecasing conversion
});

// Synchronize the model in DB
sequelize.sync()
    .then(() => console.log("PestType model synchronized with the database"))
    .catch(error => console.error("Error synchronizing PestType model:", error));

// Export the PestType model
module.exports = PestType;
