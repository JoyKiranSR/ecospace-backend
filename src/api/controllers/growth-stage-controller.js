// src/api/controllers/growth-stage-controller.js

/**
 * @module growth-stage-controller
 * Ecospace GrowthStage Controller
 * 
 * @description This module defines the controller for handling growth stage related requests in the Ecospace backend.
 * It includes functions for creating growth stage, fetching all growth stages, fetching a growth stage by its ID,
 * updating growth stage details, and deleting a growth stage.
 * This controller is used to process requests related to growth stage management and interact with the growth stage service.
 * It handles the business logic for growth stage-related operations and returns appropriate responses to the client.
 * 
 * @requires ../../utils/common
 * @requires ../services/growth-stage-service
 * @exports { createGrowthStage }
 */

// Custom module imports
const { toSnakeCaseKeys } = require("../../utils/common");
const { saveGrowthStage } = require("../services/growth-stage-service");

/**
 * @function createGrowthStage
 * @post /growth-stages
 *
 * @description Handles the creation of a new growth stage entry.
 * This function processes the request body to extract growth stage details,
 * validates the required fields, and calls the growth stage service to save the growth stage details to the database
 * and returns the saved growth stage object in the response.
 *
 * @param {Object} req - The request object containing the growth stage details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the saved growth stage object and a success message.
 * @throws {Error} - Throws an error if the save operation fails, returning a 500 status code with an error message.
 */
const createGrowthStage = async (req, res) => {
    let growthStageDetails = {};
    // Get body of the request
    if (!req.body) return res.status(400).json({ message: "Required body" });
    console.log(req.body);
    // Destructure the growth stage details from the request body
    const { description, max_days: maxDays, min_days: minDays,
        name, order } = req.body;

    // Add mandatory values to growth stage details
    growthStageDetails = { description, name, order };
    // Add optional values
    if (![ undefined, null ].includes(maxDays)) growthStageDetails.maxDays = maxDays;
    if (![ undefined, null ].includes(minDays)) growthStageDetails.minDays = minDays;

    // Try to save the growth stage details
    try {
        const growthStage = await saveGrowthStage(growthStageDetails);
        return res.status(201).json({ data: toSnakeCaseKeys(growthStage), message: 'GrowthStage created successfully' })
    } catch (error) {
        console.error("Error creating soil:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Export the controller handler functions to use in the routes
module.exports = { createGrowthStage };
