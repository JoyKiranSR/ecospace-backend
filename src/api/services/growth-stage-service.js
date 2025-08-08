// src/api/services/growth-stage-service.js

/**
 * @module growth-stage-service
 * Ecospace Growth Stage Service
 * 
 * @description This module provides services related to growth stage management in the Ecospace backend.
 * It includes functions for saving growth stage details, fetching all growth stages, fetching a growth stage by its ID,
 * updating growth stage details, and deleting a growth stage.
 * This service is used to interact with the growth stage data in the database and perform operations related to growth stage management.
 *
 * @requires ../../db/models/GrowthStage
 * @exports { getAllGrowthStages, saveGrowthStage }
 */

// Custom module imports
const { PLANT_GROWTH_STAGE } = require("../../constants/plant-constant");
const GrowthStage = require("../../db/models/GrowthStage");

/**
 * @function getAllGrowthStages
 * 
 * @description Fetches all growth stages from the PostgreSQL database using Sequelize.
 * @returns {Promise<Object>} - An object containing an array of growth stages.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllGrowthStages = async () => {
    // Try to fetch all growth stages from DB
    try {
        return await GrowthStage.findAll({ raw: true });// Fetches plain objects directly
    } catch (error) {
        console.error("Error fetching all growth stages: ", error?.message || error);
        throw new Error("Failed to fetch growth stages"); 
    }
};

/**
 * @function saveGrowthStage
 * 
 * @description Saves a growth stage to the PostgreSQL database using Sequelize.
 * This function takes growth stage details as input and creates a new growth stage entry in the database.
 * It returns the saved growth stage object or throws an error if the save operation fails.
 * 
 * @param {Object} growthStageDetails - The details of the growth stage to be saved.
 * @returns {Promise<Object>} - The saved growth stage object.
 * @throws {Error} - Throws an error if the save operation fails.
 */
const saveGrowthStage = async (growthStageDetails) => {
    try {
        // Save the details for the growth stage
        const growthStage = await GrowthStage.create(growthStageDetails);
        return growthStage.toJSON(); // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error saving growth stage: ", error?.message || error);
        throw new Error("Failed to save growth stage");
    }
};

// Export the service functions to use in the controllers
module.exports = { getAllGrowthStages, saveGrowthStage };
