// src/api/controllers/plant-controller.js

/**
 * @module plant-controller
 * Ecospace Plant Controller
 *
 * @description This module defines the controller to handle plant-related endpoints in the Ecospace backend.
 * It includes functions to create a plant, fetch all plants, and fetch a plant by its ID.
 *
 * @requires plant-service
 * @exports {createPlant, fetchAllPlants, fetchPlantById, updatePlantDetailsById}
 */

// Custom module imports
const { getAllPlants, getPlantById, savePlant, updatePlantDetails } = require("../services/plant-service");

/**
 * @function createPlant
 * @post
 * @description Handles the creation of a new plant.
 * It validates the request body, constructs a plant object, and saves it to the database.
 * If the request body is invalid, it returns a 400 status code with an error message.
 * 
 * @param {Object} req - The request object containing the plant details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the created plant details and a success message if successful,
 * or an error message with a 500 status code if the creation fails.
 */
const createPlant = async (req, res) => {
    let plantDetails = {};
    if (!req.body) return res.status(400).json({ message: "Required body" });
    console.log(req.body)
    // Destructure the plant details from the request body
    const { category, common_names: commonNames, common_pests: commonPests, compatible_plants: compatiblePlants,
        growth_cycle: growthCycle, growth_habit: growthHabit, growth_stages: growthStages,
        ideal_season: idealSeason, name, purpose, recommended_fertilizers: recommendedFertilizers,
        region_compatibility: regionCompatibility, scientific_name: scientificName, tags } = req.body;

    // Add values to plant object
    plantDetails = { name, category, growthCycle, growthHabit, idealSeason, purpose };

    // Add optional values
    if (commonNames) plantDetails.commonNames = commonNames;
    if (commonPests) plantDetails.commonPests = commonPests;
    if (compatiblePlants) plantDetails.compatiblePlants = compatiblePlants;
    if (growthStages) plantDetails.growthStages = growthStages;
    if (recommendedFertilizers) plantDetails.recommendedFertilizers = recommendedFertilizers;
    if (regionCompatibility) plantDetails.regionCompatibility = regionCompatibility;
    if (scientificName) plantDetails.scientificName = scientificName;
    if (tags) plantDetails.tags = tags;

    // Save to DB
    try {
        const plant = await savePlant(plantDetails);
        return res.status(201).send({ data: plant, message: "Created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
};

/**
 * @function fetchAllPlants
 * @get
 * @description Handles the retrieval of all plants from the database.
 * It fetches all plants and returns them in a JSON response with a success message.
 * If there are no plants, it returns an empty array.
 * 
 * @param {Object} req - The request object containing query parameters for pagination and sorting.
 * @param {Object} req.sanitizedQuery - The sanitized query parameters including filters, pagination, and sorting.
 * @param {string} req.sanitizedQuery.category - The category of the plant (optional).
 * @param {string} req.sanitizedQuery.growth_cycle - The growth cycle of the plant (optional).
 * @param {string} req.sanitizedQuery.growth_habit - The growth habit of the plant (optional).
 * @param {string} req.sanitizedQuery.ideal_season - The ideal season for the plant (optional).
 * @param {string} req.sanitizedQuery.purpose - The purpose of the plant (optional).
 * @param {number} req.sanitizedQuery.limit - The maximum number of plants to return per page (optional).
 * @param {number} req.sanitizedQuery.page - The current page number for pagination (optional).
 * @param {string} req.sanitizedQuery.sort_by - The field to sort by (optional, default is 'createdAt').
 * @param {string} req.sanitizedQuery.sort_order - The order of sorting (optional, default is 'asc').
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the list of plants, pagination metadata, and a success message.
 * If an error occurs, it returns a 500 status code with an error message.
 */
const fetchAllPlants = async (req, res) => {
    try {
        let { category, growth_cycle: growthCycle, growth_habit: growthHabit,
            ideal_season: idealSeason, purpose, limit, page, sort_by: sortBy, sort_order: sortOrder } = req.sanitizedQuery;
        const DEFAULT_LIMIT = 10, MAX_LIMIT = 100, DEFAULT_PAGE = 1 ; // Default pagination values
        const SORT_PARAMS = ["name", "createdAt"], DEFAULT_SORT_BY = "createdAt", DEFAULT_SORT_ORDER = "asc"; // Default sorting values 
        /** 
         * Validations: Pagination
         *
         * If limit and page are provided, use them to paginate results else use default values
         * limit: Maximum number of plants to return per page
         * page: Current page number for pagination
         *
         * Ensure limit is at least 1 and page is at least 1
         * Also ensure max limit is 1000 and max page is 1000
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
         * If filters parameters are provided, use them to filter results
         * category: Category of the plant (optional)
         * growthCycle: Growth cycle of the plant (optional)
         * growthHabit: Growth habit of the plant (optional)
         * idealSeason: Ideal season for the plant (optional)
         * purpose: Purpose of the plant (optional)
         */
        let filters = {};
        if (category) filters.category = category;
        if (growthCycle) filters.growthCycle = growthCycle;
        if (growthHabit) filters.growthHabit = growthHabit;
        if (idealSeason) filters.idealSeason = idealSeason;
        if (purpose) filters.purpose = purpose;

        // Fetch all plants with pagination, sorting and filtering
        const result = await getAllPlants({ limit, page }, { sortBy, sortOrder }, filters);
        return res.status(200).json({ ...result, message: "Retrieved all plants successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
};

/**
 * @function fetchPlantById
 * @get
 * @description Handles the retrieval of a plant by its ID.
 * It checks if the plant exists in the database and returns its details.
 * If the plant is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the plant ID in the path parameters.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the plant details or an error message.
 */
const fetchPlantById = async (req, res) => {
    // Get plant id from path params
    const plantId = req.params.plantId;
    // Get plant details by its id
    try {
        const plant = await getPlantById(plantId);
        const message = plant ? "Retrieved plant details successfully" : "Plant details not found";
        const statusCode = plant ? 200 : 404;
        return res.status(statusCode).json({ data: plant, message });
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
};

/**
 * @function updatePlantDetailsById
 * @patch
 * @description Handles the patch update of plant details by its ID.
 * It checks and updates the details of the plant in the database and returns its details.
 * If the plant is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the plant details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the updated plant details and a success message if successful,
 * or null if no plant found for the given ID or an error message with a 500 status code if the updation fails.
 */
const updatePlantDetailsById = async (req, res) => {
    const updatePlantDetailParams = ["common_names", "common_pests", "compatible_plants", "growth_stages",
        "recommended_fertilizers", "region_compatibility", "scientific_name", "tags"];
    let plantDetails = {};
    if (!req.params.plantId) return res.status(400).json({ message: "Required ID of the plant" });
    if (!req.body) return res.status(400).json({ message: "Required body" });
    // Check valid params for patch update
    if (!Object.keys(req.body).every(param => updatePlantDetailParams.includes(param))) return res.status(400).json({ message: "No details to update" });
    console.debug("Body received for update:", req.body);
    console.debug("Path param plantId received for update:", req.params.plantId);

    // Get plantId from request params
    const { plantId } = req.params;
    // Destructure the plant details from the request body
    const { common_names: commonNames, common_pests: commonPests, compatible_plants: compatiblePlants,
        growth_stages: growthStages, recommended_fertilizers: recommendedFertilizers,
        region_compatibility: regionCompatibility, scientific_name: scientificName, tags } = req.body;
    
    // Pass details to be updated of the plant to an object
    if (commonNames) plantDetails.commonNames = commonNames;
    if (commonPests) plantDetails.commonPests = commonPests;
    if (compatiblePlants) plantDetails.compatiblePlants = compatiblePlants;
    if (growthStages) plantDetails.growthStages = growthStages;
    if (recommendedFertilizers) plantDetails.recommendedFertilizers = recommendedFertilizers;
    if (regionCompatibility) plantDetails.regionCompatibility = regionCompatibility;
    if (scientificName) plantDetails.scientificName = scientificName;
    if (tags) plantDetails.tags = tags;

    // Update details to DB
    try {
        const plant = await updatePlantDetails(plantId, plantDetails);
        if (!plant) return res.status(404).send({ data: null, message: "Plant not found" });
        return res.status(200).send({ data: plant, message: "Updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
};

// Export the controller handler functions for use in the routes
module.exports = { createPlant, fetchAllPlants, fetchPlantById, updatePlantDetailsById };
