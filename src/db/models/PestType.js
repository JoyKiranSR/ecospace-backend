// src/db/models/PestType.js

/**
 * @module PestType
 * Ecospace PestType Model
 * 
 * @description This module defines the PestType model for the Ecospace backend using Sequelize ORM.
 * It includes fields for pest type characteristics such as name and description.
 * It also includes validation rules for these fields to ensure data integrity.
 * 
 * @requires sequelize
 * @requires ../../constants/pest-constant
 * @exports PestType
 */

// Core module imports
const { DataTypes } = require("sequelize");

// Custom module imports
const sequelize = require("../../db/index");
const { PEST_TYPE } = require("../../constants/pest-constant");

/**
 * @constant PestType
 * @type {import("sequelize").Model}
 * @description PestType model definition for the Ecospace backend using Sequelize ORM.
 * 
 * @property {string} id - Unique identifier for the pest type.
 * @property {string} name - Name of the pest type.
 * @property {string} description - Description of the pest type.
 * @returns {import("sequelize").Model} - Returns the PestType model instance.
 * 
 * @example
 * // Example usage:
 * const PestType = require('./models/PestType');
 * const newPestType = await PestType.create({
 *   name: 'caterpillar',
 *   description: 'A common pest that causes damage to crops.',
 * });
 */
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
}, {
    paranoid: true, // Adds soft delete
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
