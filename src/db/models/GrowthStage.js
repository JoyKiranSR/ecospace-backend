// src/db/models/GrowthStage.js

/**
 * @module GrowthStage
 * Ecospace GrowthStage Model
 * 
 * @description This module defines the GrowthStage model for the Ecospace backend.
 * It includes the schema for soil properties such as name, description, order, image_url, 
 * min_days, max_days, notes.
 * The model is used to interact with the database for growth stage related operations.
 *
 * @requires sequelize
 * @requires ../../constants/plant-constant
 * @exports GrowthStage
 */

// Core module imports
const { DataTypes } = require("sequelize");

// Custom module imports
const sequelize = require("../index");
const { PLANT_GROWTH_STAGE } = require("../../constants/plant-constant");

/**
 * @constant GrowthStage
 *
 * @description
 *
 * @type {Model}
 * @property {UUID} id - Unique identifier for the growth stage (UUID).
 * @property {string} description - The description for the growth stage.
 * @property {string} imageUrl - The single image url to show the growth stage
 * @property {number} maxDays - The maximum number of days for the growth stage to complete.
 * @property {number} minDays - The minimum number of days for the growth stage to complete.
 * @property {string} name - The unique name of the growth stage
 * @property {number} order - The unique number to mark the rank of the growth stage
 * @returns {Model} - Returns the GrowthStage model instance.
 * 
 * @example
 * // Example usage:
 * const GrowthStage = require('./models/GrowthStage');
 * const newGrowthStage = await GrowthStage.create({
 *  name: 'germination',
 *  description: 'Germination is the first stage of a plant’s life cycle.',
 *  order: 1,
 *  imageUrl: 'https://image-link-germination.jpg',
 *  minDays: 0,
 *  maxDays: 5,
 * });
 */
const GrowthStage = sequelize.define('GrowthStage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT, // No limit to characters
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    maxDays: {
        type:  DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1 // Max duration days should be min of 1 day
        },
    },
    minDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0 // Min duration days can be 0 as well (ex: germination)
        },
    },
    name: {
        type: DataTypes.ENUM(Object.values(PLANT_GROWTH_STAGE)),
        allowNull: false,
        // unique: true,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            min: 1 // Order always starts from 1
        },
    },
}, {
    validate: {
        minLessThanMax() {
            if (this.minDays != null && this.maxDays != null && this.minDays >= this.maxDays) {
                throw new Error('minDays must be less than maxDays');
            }
        }
    },
    tableName: 'growth_stages', // Use a custom table name
    timestamps: true, // Enable createdAt and updatedAt fields
    underscored: true, // Use snake_case for database fields
});

// Synchronize the model with the database
sequelize.sync()
    .then(() => console.log("GrowthStage model synchronized with the database"))
    .catch(error => console.error("Error synchronizing GrowthStage model:", error?.message || error));

// Export the GrowthStage model
module.exports = GrowthStage;
