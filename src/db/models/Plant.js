// src/db/models/Plant.js

/**
 * @module Plant
 * Ecospace Plant Model
 * 
 * @description This module defines the Plant model for the Ecospace backend using Sequelize ORM.
 * It includes fields for plant characteristics such as name, category, growth cycle, growth habit, ideal season,
 * purpose, common names, common pests, compatible plants, growth stages, recommended fertilizers, region compatibility,
 * scientific name, and tags.
 * It also includes validation rules for these fields to ensure data integrity.
 * 
 * @requires sequelize
 * @requires ../../constants/plant-constant
 * @requires ../../constants/season-constant
 * @exports Plant
 */

// Core module imports
const { DataTypes } = require('sequelize');
// Custom module imports
const sequelize = require('../index');
const { PLANT_CATEGORY, PLANT_GROWTH_CYCLE, PLANT_GROWTH_HABIT, PLANT_PURPOSE, PLANT_GROWTH_STAGE } = require('../../constants/plant-constant');
const { SEASON } = require('../../constants/season-constant');

/**
 * @constant Plant
 * 
 * @description Defines the Plant model for the Ecospace backend.
 * It includes fields for plant characteristics such as name, category, growth cycle,
 * growth habit, ideal season, purpose, common names, common pests, compatible plants,
 * growth stages, recommended fertilizers, region compatibility, scientific name, and tags.
 * * It also includes validation rules for these fields to ensure data integrity.
 * @type {Model}
 * @property {UUID} id - Unique identifier for the plant (UUID).
 * @property {string} name - Name of the plant (string, max 20 characters, unique).
 * @property {string} category - Category of the plant (ENUM: PLANT_CATEGORY).
 * @property {string} growthCycle - Growth cycle of the plant (ENUM: PLANT_GROWTH_CYCLE).
 * @property {string} growthHabit - Growth habit of the plant (ENUM: PLANT_GROWTH_HABIT).
 * @property {string} idealSeason - Ideal season for the plant (ENUM: SEASON).
 * @property {string} purpose - Purpose of the plant (ENUM: PLANT_PURPOSE).
 * @property {Array<string>} commonNames - Common names of the plant (array of strings, optional).
 * @property {Array<string>} commonPests - Common pests affecting the plant (array of strings, optional).
 * @property {Array<string>} compatiblePlants - Plants that are compatible with this plant (array of strings, optional).
 * @property {Array<string>} growthStages - Growth stages of the plant (array of strings, custom validation with ENUM: PLANT_GROWTH_STAGE, optional).
 * @property {Array<string>} recommendedFertilizers - Recommended fertilizers for the plant (array of strings, optional).
 * @property {Array<string>} regionCompatibility - Regions where the plant is compatible (array of strings, optional).
 * @property {string} scientificName - Scientific name of the plant (string, max 50 characters, unique, optional).
 * @property {Array<string>} tags - Tags associated with the plant (array of strings, optional).
 * @property {boolean} timestamps - Indicates whether to add createdAt and updatedAt timestamps (true).
 * @property {string} tableName - Name of the database table for the model ('plants').
 * @returns {Model} - Returns the Plant model instance.
 * 
 * @example
 * // Example usage:
 * const Plant = require('./models/Plant');
 * const newPlant = await Plant.create({
 *  name: 'Tomato',
 *  category: 'crop',
 *  growthCycle: 'annual',
 *  growthHabit: 'herbaceous',
 *  idealSeason: 'summer',
 *  purpose: 'vegetable',
 *  commonNames: ['Tomato', 'Solanum lycopersicum'],
 *  commonPests: ['Aphids', 'Whiteflies'],
 *  compatiblePlants: ['Basil', 'Marigold'],
 *  growthStages: ['seedling', 'vegetative', 'flowering', 'fruiting'],
 *  recommendedFertilizers: ['NPK', 'Compost'],
 *  regionCompatibility: ['North America', 'Europe'],
 *  scientificName: 'Solanum lycopersicum',
 *  tags: ['vegetable', 'fruit', 'crop']
 *  });
 * 
 */
const Plant = sequelize.define('Plant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20), // Limit to 20 characters
        unique: true, // Ensure plant names are unique
        allowNull: false, // Required field
    },
    category: {
        type: DataTypes.ENUM(Object.values(PLANT_CATEGORY)), // Use constants
        allowNull: false, // Required field
    },
    growthCycle: {
        type: DataTypes.ENUM(Object.values(PLANT_GROWTH_CYCLE)), // Use constants
        allowNull: false, // Required field
    },
    growthHabit: {
        type: DataTypes.ENUM(Object.values(PLANT_GROWTH_HABIT)), // Use constants
        allowNull: false, // Required field
    },
    idealSeason: {
        type: DataTypes.ENUM(Object.values(SEASON)), // Use constants
        allowNull: false, // Required field
    },
    purpose: {
        type: DataTypes.ENUM(Object.values(PLANT_PURPOSE)), // Use constants
        allowNull: false, // Required field
    },
    commonNames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // Default to an empty array if no value is provided
    },
    commonPests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true, // Optional field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    compatiblePlants: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true, // Optional field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    growthStages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // Custom validation to ensure growth_stages is an array of allowed growth stages
        validate: {
            isValidGrowthStages(value) {
                if (!value) return; // Skip validation if value is null or undefined
                if (!Array.isArray(value)) throw new Error('growth_stages must be an array');
                const growthStages = Object.values(PLANT_GROWTH_STAGE);
                // Convert to lowercase and trim whitespace for comparison and filter invalid stages
                const invalid = value
                                    .map(stage => stage.trim().toLowerCase())
                                    .filter(stage => !growthStages.includes(stage));
                if (invalid.length > 0) {
                    throw new Error(`Invalid growth stage(s): ${invalid.join(', ')}`);
                }
            }
        },
        defaultValue: [], // Default to an empty array if no value is provided
    },
    recommendedFertilizers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // Default to an empty array if no value is provided
    },
    regionCompatibility: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // Default to an empty array if no value is provided
    },
    scientificName: {
        type: DataTypes.STRING(50), // Limit to 50 characters
        unique: true, // Ensure scientific names are unique
        allowNull: true, // Optional field
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // Default to an empty array if no value is provided
    },
}, {    
    timestamps: true,
    tableName: 'plants', // Set table name
    underscored: true, // // Use snake_case for database fields
});

// Synchronize the model with the database
Plant.sync()
    .then(() => console.log('Plant model synchronized with the database'))
    .catch(error => console.error('Error synchronizing Plant model:', error));
    
// Export the Plant model
module.exports = Plant;
