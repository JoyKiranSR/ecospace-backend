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
 * @exports { createGrowthStage, fetchAllGrowthStages, fetchGrowthStageById, updateGrowthStageDetailsById }
 */

// Custom module imports
const { toSnakeCaseKeys } = require("../../utils/common");
const { getAllGrowthStages, getGrowthStageById, saveGrowthStage, updateGrowthStageDetails } = require("../services/growth-stage-service");

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
        console.error("Error creating growth stage:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function fetchAllGrowthStages
 * @get /growth-stages
 * @description Handles the retrieval of all growth stages from the database.
 * It fetches all growth stages and returns them in a JSON response with a success message.
 * If there are no growth stages, it returns an empty array.
 * 
 * @param {Object} req - The request object to be processed.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the list of growth stages as data and a success message.
 * If an error occurs, it returns a 500 status code with an error message.
 */
const fetchAllGrowthStages = async (req, res) => {
    /**
     * No pagination, sorting and filtering as we will have max of 6-7 growth stages
     * So, will fetch all and return
     */
    // try to fetch all growth stages
    try {
        const growthStages = await getAllGrowthStages();
        return res.status(200).json({ data: toSnakeCaseKeys(growthStages), message: "Retrieved all growth stages successfully" }) 
    } catch (error) {
        return res.status(500).json({ message: error.message });  
    }
};

/**
 * @function fetchGrowthStageById
 * @get /growth-stages/:growth_stage_id
 *
 * @description Handles fetching a growth stage by its ID.
 * This function extracts the growth stage ID from the request parameters, calls the growth stage service
 * to fetch the growth stage details from the database, and returns the growth stage object in the response.
 * If the growth stage is not found, it returns a 404 status code with a message.
 *
 * @param {Object} req - The request object containing the growth stage ID in the parameters.
 * @param {string} req.params.growth_stage_id - The ID of the growth stage.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the growth stage object if found, or
 * a 404 status code with a message if the growth stage does not exist.
 * @throws {Error} - Throws an error if the fetch operation fails, returning a 500 status code with an error message.
 */
const fetchGrowthStageById = async (req, res) => {
    // Get growth stage id
    const growthStageId = req.params["growth_stage_id"];

    // Try to fetch a growth stage
    try {
        // Fetch the growth stage by ID using the service
        const growthStage = await getGrowthStageById(growthStageId);
        const message = growthStage ? "Growth stage fetched successfully" : "Growth stage not found";
        const statusCode = growthStage ? 200 : 404;
        return res.status(statusCode).json({ data: toSnakeCaseKeys(growthStage), message });
    } catch (error) {
        console.error("Error fetching growth stage by ID:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function updateGrowthStageDetailsById
 * @patch /growth-stages/:growth_stage_id
 *
 * @description Handles the patch update of growth stage details by its ID.
 * It checks and updates the details of the growth stage in the database and returns its details.
 * If the growth stage is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the growth stage details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the updated growth stage details and a success message if successful,
 * or null if no growth stage found for the given ID or an error message with a 500 status code if the updation fails.
 */
const updateGrowthStageDetailsById = async (req, res) => {
    // Allowed body params for the update
    const updateGrowthStageParams = ["description", "max_days", "min_days"];
    
    // Get growth stage id from req params
    const growthStageId = req.params["growth_stage_id"];
    if (!growthStageId) return res.status(400).json({ message: "Required ID of the growth stage" });

    // Get body params
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Required body" });
    const bodyParams = Object.keys(body);
    if (bodyParams.length === 0 || !bodyParams.some(param => updateGrowthStageParams.includes(param))) return res.status(400).json({ message: "No details to update" });
    const { description, max_days: maxDays, min_days: minDays } = req.body;

    console.debug("Body received for update:", body);
    console.debug("Path param growth_stage_id received for update:", growthStageId);
    let growthStageDetails = {};

    // Pass the details to be updated
    if (description) growthStageDetails.description = description;
    if (maxDays) growthStageDetails.maxDays = maxDays;
    if (minDays) growthStageDetails.minDays = minDays;

    // Try to update growth stage details
    try {
        const growthStage = await updateGrowthStageDetails(growthStageId, growthStageDetails);
        if (!growthStage) return res.status(404).json({ message: "Growth stage not found" });
        return res.status(200).json({ data: toSnakeCaseKeys(growthStage), message: "Updated successfully" });
    } catch (error) {
        console.error("Error updating growth stage by ID:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Export the controller handler functions to use in the routes
module.exports = { createGrowthStage, fetchAllGrowthStages, fetchGrowthStageById, updateGrowthStageDetailsById };
