// src/db/models/Soil.js

/**
 * @module Soil
 * Ecospace Soil Model
 *
 * @description This module defines the Soil model for the Ecospace backend.
 * It includes the schema for soil properties such as drainage, nutrient level, organic matter level,
 * pH levels, texture, type, and water retention level.
 * The model is used to interact with the database for soil-related operations.
 *
 * @requires sequelize
 * @requires ../../constants/soil-constant
 * @exports Soil
 */

// Core module imports
const { DataTypes } = require("sequelize");
// Custom module imports
const sequelize = require("../index");
const { SOIL_DRAINAGE, SOIL_NUTRIENT_LEVEL, SOIL_ORGANIC_MATTER_LEVEL, SOIL_PH_TYPE,
    SOIL_TEXTURE, SOIL_TYPE, SOIL_WATER_RETENTION_LEVEL } = require("../../constants/soil-constant");

/**
 * @constant Soil
 *
 * @description Defines the Soil model for the Ecospace backend.
 * It includes fields for soil properties such as drainage, nutrient level, organic matter level,
 * pH levels, texture, type, and water retention level.
 * It also includes validation rules for these fields to ensure data integrity.
 * This model is used to interact with the database for soil-related operations.
 * 
 * @type {Model}
 * @property {UUID} id - Unique identifier for the soil (UUID).
 * @property {string} color - Color of the soil (string, max 20 characters, optional).
 * @property {string} description - Description of the soil (string, max 255 characters, optional).
 * @property {string} drainage - Drainage type of the soil (ENUM: SOIL_DRAINAGE).
 * @property {string} name - Name of the soil (string, max 50 characters, unique).
 * @property {string} nutrientLevel - Nutrient level of the soil (ENUM: SOIL_NUTRIENT_LEVEL, field: "nutrient_level").
 * @property {string} organicMatterLevel - Organic matter level of the soil (ENUM: SOIL_ORGANIC_MATTER_LEVEL, field: "organic_matter_level").
 * @property {number} phMax - Maximum pH level of the soil (float, field: "ph_max", optional).
 * @property {number} phMin - Minimum pH level of the soil (float, field: "ph_min", optional).
 * @property {string} phType - pH type of the soil (ENUM: SOIL_PH_TYPE, field: "ph_type", optional).
 * @property {string} texture - Texture of the soil (ENUM: SOIL_TEXTURE).
 * @property {string} type - Type of the soil (ENUM: SOIL_TYPE).
 * @property {string} waterRetentionLevel - Water retention level of the soil (ENUM: SOIL_WATER_RETENTION_LEVEL, field: "water_retention_level").
 * @property {boolean} timestamps - Indicates whether to add createdAt and updatedAt timestamps (true).
 * @property {string} tableName - Name of the database table for the model ('soils').
 * @returns {Model} - Returns the Soil model instance.
 *
 * @example
 * // Example usage:
 * const Soil = require('./models/Soil');
 * const newSoil = await Soil.create({
 *   name: 'Loamy Soil',
 *   drainage: 'well-drained',
 *   nutrientLevel: 'moderate',
 *   organicMatterLevel: 'high',
 *   texture: 'loamy',
 *   type: 'forest',
 *   waterRetentionLevel: 'moderate',
 *   color: 'brown',
 *   description: 'A well-balanced soil with good drainage and nutrient content.',
 *   phMax: 7.5,
 *   phMin: 6.0,
 *   phType: 'neutral'
 * });
 */
const Soil = sequelize.define("Soil", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID for the primary key
        primaryKey: true,
    },
    color: {
        type: DataTypes.STRING(20), // Limit to 20 characters
        allowNull: true, // Optional field
    },
    description: {
        type: DataTypes.STRING(255), // Limit to 255 characters
        allowNull: true, // Optional field
    },
    drainage: {
        type: DataTypes.ENUM(Object.values(SOIL_DRAINAGE)),
        allowNull: false, // Required field
    },
    name: {
        type: DataTypes.STRING(50), // Limit to 50 characters
        unique: true, // Ensure soil names are unique
        allowNull: false, // Required field
    },
    nutrientLevel: {
        type: DataTypes.ENUM(Object.values(SOIL_NUTRIENT_LEVEL)),
        allowNull: false, // Required field
    },
    organicMatterLevel: {
        type: DataTypes.ENUM(Object.values(SOIL_ORGANIC_MATTER_LEVEL)),
        allowNull: false, // Required field
    },
    phMax: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field
    },
    phMin: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field
    },
    phType: {
        type: DataTypes.ENUM(Object.values(SOIL_PH_TYPE)),
        allowNull: true, // Optional field
    },
    texture: {
        type: DataTypes.ENUM(Object.values(SOIL_TEXTURE)),
        allowNull: false, // Required field
    },
    type: {
        type: DataTypes.ENUM(Object.values(SOIL_TYPE)),
        allowNull: false, // Required field
    },
    waterRetentionLevel: {
        type: DataTypes.ENUM(Object.values(SOIL_WATER_RETENTION_LEVEL)),
        allowNull: false, // Required field
    },
}, {
    tableName: "soils", // Use a custom table name
    timestamps: true, // Enable createdAt and updatedAt fields
    underscored: true, // Use snake_case for database fields
});

// Synchronize the model with the database
Soil.sync({ alter: true })
    .then(() => console.log("Soil model synchronized with the database"))
    .catch(error => console.error("Error synchronizing Soil model:", error?.message || error));

// Export the Soil model
module.exports = Soil;
