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
const { getSoilById, saveSoil, getAllSoils, removeSoil, updateSoilDetails } = require("../services/soil-service");

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

/**
 * @function deleteSoilById
 * @delete /soils/:soil_id
 * @description Handles the deletion of a soil by its ID.
 * It checks if the soil exists in the database and deletes it (hard delete).
 * If the soil is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the soil ID in the path parameters.
 * @param {string} req.params.soil_id - The ID of the soil to be deleted.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a response with statusCode as 204,
 * or an error message with a 500 status code if the deletion fails.
 */
const deleteSoilById = async (req, res) => {
    const soilId = req.params["soil_id"];
    if (!soilId) return res.status(400).json({ message: "Required ID of the soil" });
    try {
        const soil = await getSoilById(soilId);
        if (!soil) return res.status(404).json({ message: "Soil not found" });
        // Remove soil from DB
        await removeSoil(soilId);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
}

const fetchAllSoils = async (req, res) => {
    // Extract pagination, sorting, and filters from the request query
    let { drainage, limit, nutrient_level: nutrientLevel, organic_matter_level: organicMatterLevel,
        page, sort_by: sortBy, sort_order: sortOrder, texture, type,
        water_retention_level: waterRetentionLevel } = req.sanitizedQuery ?? req.query;
    const DEFAULT_LIMIT = 10, MAX_LIMIT = 50, DEFAULT_PAGE = 1 ; // Default pagination values
    const SORT_PARAMS = ["name", "created_at"], DEFAULT_SORT_BY = "created_at", DEFAULT_SORT_ORDER = "asc"; // Default sorting values
    /** 
     * Validations: Pagination
     *
     * If limit and page are provided, use them to paginate results else use default values
     * limit: Maximum number of soils to return per page
     * page: Current page number for pagination
     *
     * Ensure limit is at least 1 and page is at least 1
     * Also ensure max limit is 50
     * This prevents excessive load on the server and ensures reasonable pagination
     * If limit or page is not provided, use default values
     * Default limit is 10 and default page is 1
     *
     * Note: Here validations are just incase you miss express validations to apply as middleware in routes
     * so that you can still use this controller handler function without any issues, so that the 
     * below validations comes in handy.
     */
    limit = Math.min(MAX_LIMIT, Math.max(DEFAULT_LIMIT, parseInt(limit, 10) || DEFAULT_LIMIT));
    page = Math.max(DEFAULT_PAGE, parseInt(page, 10) || DEFAULT_PAGE);

    /**
     * Validations: Sorting
     *
     * If sortBy and sortOrder are provided, use them to sort results else use default values
     * sortBy: Field to sort by (default is createdAt)
     * sortOrder: Order to sort by (default is asc)
     * Ensure sortBy is one of the allowed fields and sortOrder is either asc or desc
     *
     * Note: Here validations are just incase you miss express validations to apply as middleware in routes
     * so that you can still use this controller handler function without any issues, so that the 
     * below validations comes in handy.
     */
    if (!sortBy || (sortBy && !SORT_PARAMS.includes(sortBy))) sortBy = DEFAULT_SORT_BY;
    if (!sortOrder || (sortOrder && !["asc", "desc"].includes(String(sortOrder).toLowerCase()))) sortOrder = DEFAULT_SORT_ORDER;

    /**
     * Filtering
     *
     * If filter parameters are provided, use them to filter results
     * drainage
     * nutrient_level
     * organic_matter_level
     * texture
     * type
     * water_retention_level
     */
    let filters = {};
    if (drainage) filters.drainage = drainage;
    if (nutrientLevel) filters.nutrientLevel = nutrientLevel;
    if (organicMatterLevel) filters.organicMatterLevel = organicMatterLevel;
    if (texture) filters.texture = texture;
    if (type) filters.type = type;
    if (waterRetentionLevel) filters.waterRetentionLevel = waterRetentionLevel;

    // Try to fetch all soils with pagination, sorting and filtering
    try {
        const result = await getAllSoils({ limit, page }, { sortBy, sortOrder }, filters);
        return res.status(200).json({ ...toSnakeCaseKeys(result), message: "Retrieved all soils successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
};

/**
 * @function fetchSoilById
 * @get /soils/:id
 * 
 * @description Handles fetching a soil by its ID.
 * This function extracts the soil ID from the request parameters, calls the soil service
 * to fetch the soil details from the database, and returns the soil object in the response.
 * If the soil is not found, it returns a 404 status code with a "Soil not found" message.
 * 
 * @param {Object} req - The request object containing the soil ID in the parameters.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the soil object if found, or
 * a 404 status code with a "Soil not found" message if the soil does not exist.
 * @throws {Error} - Throws an error if the fetch operation fails, returning a 500 status code with an error message.
 */
const fetchSoilById = async (req, res) => {
    // Extract the soil ID from the request parameters
    const { soil_id: soilId } = req.params;
    // Try to fetch the soil by ID using the service
    try {
        // Fetch the soil by ID using the service
        const soil = await getSoilById(soilId);
        const message = soil ? "Soil fetched successfully" : "Soil not found";
        const statusCode = soil ? 200 : 404;
        return res.status(statusCode).json({ data: toSnakeCaseKeys(soil), message });
    } catch (error) {
        console.error("Error fetching soil by ID:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function updateSoilDetailsById
 * @patch
 * @description Handles the patch update of soil details by its ID.
 * It checks and updates the details of the soil in the database and returns its details.
 * If the soil is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the soil details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the updated soil details and a success message if successful,
 * or null if no soil found for the given ID or an error message with a 500 status code if the updation fails.
 */
const updateSoilDetailsById = async (req, res) => {
    // Soil detail params that can be allowed to update
    const updateSoilDetailparams = [ "color", "description", "name", "ph_max", "ph_min"];
    let soilDetails = {};
    if (!req.params["soil_id"]) return res.status(400).json({ message: "Required ID of the soil" });
    if (!req.body) return res.status(400).json({ message: "Required body" });

    const soilId = req.params["soil_id"];
    const body = req.body;

    // Check valid params for update
    if (!Object.keys(req.body).every(param => updateSoilDetailparams.includes(param))) return res.status(400).json({ message: "No details to update" });
    console.debug("Body received for update:", body);
    console.debug("Path param soil_id received for update:", soilId);

    // Destructure body params for update
    const { color, description, name, ph_max: phMax, ph_min: phMin } = body;
    // Pass details to be updated of the soil to an object
    if (color) soilDetails.color = color;
    if (description) soilDetails.description = description;
    if (name) soilDetails.name = name;
    if (phMax) soilDetails.phMax = phMax;
    if (phMin) soilDetails.phMin = phMin;
 
    // Try to update soil details
    try {
        const soil = await updateSoilDetails(soilId, soilDetails);
        if (!soil) return res.status(404).json({ data: null, message: "Soil not found" });
        return res.status(200).json({ data: toSnakeCaseKeys(soil), message: "Update successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Export the controller handler functions to use in the routes
module.exports = { createSoil, deleteSoilById, fetchAllSoils, fetchSoilById, updateSoilDetailsById };
