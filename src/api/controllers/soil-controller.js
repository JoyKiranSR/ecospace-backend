// src/api/controllers/soil-controller.js

/**
 * @module soil-controller
 * Ecospace Soil Controller
 * 
 * @description This module defines the controller for handling soil-related requests in the Ecospace backend.
 * It includes functions for creating soil, fetching all soils, fetching a soil by its ID,
 * updating soil details, and deleting a soil.
 * This controller is used to process requests related to soil management and interact with the soil service.
 * It handles the business logic for soil-related operations and returns appropriate responses to the client.
 * 
 * @requires ../../utils/common
 * @requires ../services/soil-service
 * @exports { createSoil }
 */

// Custom module imports
const { toSnakeCaseKeys } = require("../../utils/common");
const { saveSoil } = require("../services/soil-service");

/**
 * @function createSoil
 * @post /soils
 * 
 * @description Handles the creation of a new soil entry.
 * This function processes the request body to extract soil details,
 * validates the required fields, and calls the soil service to save the soil details to the database
 * and returns the saved soil object in the response.
 * 
 * @param {Object} req - The request object containing the soil details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the saved soil object and a success message.
 * @throws {Error} - Throws an error if the save operation fails, returning a 500 status code with an error message.
 */
const createSoil = async (req, res) => {
    let soilDetails = {};
    if (!req.body) return res.status(400).json({ message: "Required body" });
    console.log(req.body)
    // Destructure the soil details from the request body
    const { color, description, drainage, name, nutrient_level: nutrientLevel, organic_matter_level: organicMatterLevel,
        ph_max: phMax, ph_min: phMin, texture, type, water_retention_level: waterRetentionLevel } = req.body;

    // Add values to the soilDetails object
    soilDetails = { drainage, name, nutrientLevel, organicMatterLevel, texture, type, waterRetentionLevel };

    // Add optional properties if they exist
    if (color) soilDetails.color = color;
    if (description) soilDetails.description = description;
    if (phMax) soilDetails.phMax = phMax;
    if (phMin) soilDetails.phMin = phMin;

    // try to save the soil details
    try {
        const soil = await saveSoil(soilDetails);
        return res.status(201).json({ data: toSnakeCaseKeys(soil), message: "Soil created successfully" });
    } catch (error) {
        console.error("Error creating soil:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Export the controller handler functions to use in the routes
module.exports = { createSoil };