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
 * @exports { getAllGrowthStages, getGrowthStageById, saveGrowthStage, updateGrowthStageDetails }
 */

// Custom module imports
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
 * @function getGrowthStageById
 * 
 * @description Fetches a growth stage by its ID from the PostgreSQL database using Sequelize.
 * This function retrieves a growth stage entry based on the provided growth stage ID.
 * If the growth stage exists, it returns the growth stage object; otherwise, it returns null.
 * 
 * @param {string} growthStageId - The ID of the growth stage.
 * @returns {Promise<Object>} - The growth stage object if found, or null if not found
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getGrowthStageById = async (growthStageId) => {
    try {
        const growthStage = await GrowthStage.findByPk(growthStageId);
        // If growth stage exists, return it as a plain object or null if it doesn't exist
        return growthStage ? growthStage.toJSON() : null;
    } catch (error) {
        console.error("Error fetching growth stage by ID: ", error?.message || error);
        throw new Error("Failed to fetch growth stage by ID");
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

/**
 * @function updateGrowthStageDetails
 *
 * @description Updates a growth stage by its ID from the PostgreSQL database using Sequelize.
 *
 * @param {string} growthStageId - The ID of the growth stage.
 * @param {Object} growthStageDetails - The details of the growth stage which needs to be updated.
 * @returns {Promise<Object|null>} - The updated growth stage object if growth stage found and update successful,
 * else if growth stage not found, returns null.
 * @throws {Error} - Throws an error if the update operation fails.
 *
 * Note: This function wont guarantee growth stage presence in DB for update operation, so careful to use this
 * function with proper validations on object to be updated.
 */
const updateGrowthStageDetails = async (growthStageId, growthStageDetails) => {
    // Try to update growth stage
    try {
        const [updatedCount, updatedRows] = await GrowthStage.update(growthStageDetails, { where: { id: growthStageId }, returning: true });
        return updatedCount ? updatedRows[0].toJSON() : null; // // toJSON converts the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error updating growth stage: ", error?.message || error);
        throw new Error("Failed to update growth stage");  
    }
};

// Export the service functions to use in the controllers
module.exports = { getAllGrowthStages, getGrowthStageById, saveGrowthStage, updateGrowthStageDetails };
