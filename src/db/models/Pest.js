// src/db/models/Pest.js

/**
 * @module Pest
 * Ecospace Pest Model
 * 
 * @description This module defines the Pest model for the Ecospace backend using Sequelize ORM.
 * It includes fields for pest characteristics such as name, scientific name, pest type, control methods,
 * damage symptoms, life cycle, and description.
 * It also includes validation rules for these fields to ensure data integrity.
 * 
 * @requires sequelize
 * @exports Pest
 */

// Core module imports
const { DataTypes } = require("sequelize");

// Custom module imports
const sequelize = require("../index");
const PestType = require("./PestType");

/**
 * @constant Pest
 * @type {import("sequelize").Model}
 * @description Pest model definition for the Ecospace backend using Sequelize ORM.
 * 
 * @property {string} id - Unique identifier for the pest.
 * @property {string} name - Name of the pest.
 * @property {string} scientifcName - Scientific name of the pest.
 * @property {string} pestType - Type of the pest.
 * @property {string} controlMethods - Control methods for the pest.
 * @property {string} damageSymptoms - Damage symptoms of the pest.
 * @property {string} lifeCycle - Life cycle of the pest.
 * @property {string} description - Description of the pest.
 * @returns {import("sequelize").Model} - Returns the Pest model instance.
 * 
 * @example
 * // Example usage:
 * const Pest = require('./models/Pest');
 * const newPest = await Pest.create({
 *   controlMethods: 'chemical',
 *   damageSymptoms: 'holes in leaves, reduced plant growth, yellowing or droopy leaves',
 *   description: 'A common pest that causes damage to crops.',
 *   lifeCycle: 'The life cycle of the caterpillar begins with the female laying eggs on the underside of leaves. The eggs hatch into larvae and go through four stages of instar. The larvae feed on the plant leaves and then pupate. The adult emerges from the pupa, mating and laying eggs to start the cycle over again.',
 *   name: 'Caterpillar',
 *   pestTypeId: '550e8400-e29b-41d4-a716-446655440000',
 *   scientifcName: 'Drosophila melanogaster',
 *   seasonality: 'The caterpillar is active in the spring and summer months.',
 * });
 */
const Pest = sequelize.define("Pest", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    controlMethods: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    damageSymptoms: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lifeCycle: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    pestTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PestType,
            key: "id",
        },
    },
    scientifcName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
    },
    seasonality: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    paranoid: true, // Adds soft delete
    tableName: "pests", // Custom table name
    timestamps: true, // Adds createdAt and updatedAt
    underscored: true, // Snakecasing conversion
});

// Sync the model with the database
Pest.sync()
    .then(() => console.log("Pest model synchronized with the database"))
    .catch(error => console.error("Error synchronizing Pest model:", error?.message || error));

// Export the Pest model
module.exports = Pest;
