// src/db/models/Disease.js

/**
 * @module Disease
 * Ecospace Disease Model
 * 
 * @description This module defines the Disease model for the Ecospace backend.
 * It includes the schema for disease properties such as control methods, description, damage symptoms, life cycle,
 * name, pathogen type, seasonality, and tags.
 * The model is used to interact with the database for disease related operations.
 *
 * @requires sequelize
 * @requires ./PathogenType
 */

// Core module imports
const { DataTypes } = require("sequelize");

// Custom module imports
const sequelize = require("../index");
const PathogenType = require("./PathogenType");

const Disease = sequelize.define("Disease", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    controlMethods: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    damageSymptoms: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    lifeCycle: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    pathogenTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PathogenType, // Reference the model
            key: 'id', // Reference the id column in the pathogen_types table
        },
    },
    seasonality: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    spreadMethod: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
}, {
    paranoid: true, // Soft delete, adds deletedAt field
    tableName: 'diseases', // Set table name
    timestamps: true, // Enable createdAt and updatedAt fields
    underscored: true, // Use snake_case for database fields
});

// Synchronize the model with the database
Disease.sync()
    .then(() => console.log("Disease model synchronized with the database"))
    .catch(error => console.error("Error synchronizing Disease model:", error?.message || error));

// Export the Disease model
module.exports = Disease;
