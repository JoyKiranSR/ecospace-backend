// src/api/services/soil-service.js

/**
 * @module soil-service
 * Ecospace Soil Service
 * 
 * @description This module provides services related to soil management in the Ecospace backend.
 * It includes functions for saving soil details, fetching all soils, fetching a soil by its ID,
 * updating soil details, and deleting a soil.
 * This service is used to interact with the soil data in the database and perform operations related to soil management.
 *
 * @requires ../../db/models/Soil
 * @exports { saveSoil }
 */

// Custom module imports
const { SOIL_PH_TYPE, SOIL_DRAINAGE } = require("../../constants/soil-constant");
const Soil = require("../../db/models/Soil");

/**
 * @function saveSoil
 * 
 * @description Saves a soil to the PostgreSQL database using Sequelize.
 * This function takes soil details as input and creates a new soil entry in the database.
 * It returns the saved soil object or throws an error if the save operation fails.
 * 
 * @param {Object} soilDetails - The details of the soil to be saved.
 * @returns {Promise<Object>} - The saved soil object.
 * @throws {Error} - Throws an error if the save operation fails.
 */
const saveSoil = async (soilDetails) => {
    try {
        // Get phMin and phMax from soilDetails if they exist
        const { phMin, phMax } = soilDetails;
        if (phMin && phMax) {
            // Decide phType based on phMax
            soilDetails.phType = phMax > 7 ? SOIL_PH_TYPE.ALKALINE : phMin < 7 ? SOIL_PH_TYPE.ACIDIC : SOIL_PH_TYPE.NEUTRAL;
        }
        const soil = await Soil.create(soilDetails);
        return soil.toJSON(); // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error saving soil: ", error?.message || error);
        throw new Error("Failed to save soil");
    }
};

// Export the service functions to use in the controllers
module.exports = { saveSoil };
