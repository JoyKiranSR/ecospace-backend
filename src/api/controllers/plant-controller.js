// src/api/controllers/plant-controller.js

/**
 * @module plant-controller
 * Ecospace Plant Controller
 *
 * @description This module defines the controller to handle plant-related endpoints in the Ecospace backend.
 * It includes functions to create a plant, fetch all plants, and fetch a plant by its ID.
 *
 * @requires plant-service
 * @exports {createPlant, fetchAllPlants, fetchPlantById}
 */

// Custom module imports
const { getAllPlants, savePlant, getPlantById } = require("../services/plant-service");

/**
 * @function createPlant
 * 
 * @description Handles the creation of a new plant.
 * It validates the request body, constructs a plant object, and saves it to the database.
 * If the request body is invalid, it returns a 400 status code with an error message.
 * 
 * @param {Object} req - The request object containing the plant details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the created plant data and a success message.
 */
const createPlant = (req, res) => {
    let plantDetails = {};
    if (!req.body) return res.status(400).json({ message: "Required body" });
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
    const plant = savePlant(plantDetails);
    return res.status(201).send({ data: plant, message: "Created successfully" });
};

/**
 * @function fetchAllPlants
 * 
 * @description Handles the retrieval of all plants from the database.
 * It fetches all plants and returns them in a JSON response with a success message.
 * If there are no plants, it returns an empty array.
 * 
 * @param {Object} _req - The request object (not used in this function).
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the list of all plants and a success message.
 */
const fetchAllPlants = (_req, res) => {
    // Get all plants from DB
    const plants = getAllPlants();
    return res.status(200).json({ data: plants, message: "Retrieved all plants successfully" });
};

/**
 * @function fetchPlantById
 * 
 * @description Handles the retrieval of a plant by its ID.
 * It checks if the plant exists in the database and returns its details.
 * If the plant is not found, it returns a 404 status code with an error message.
 * 
 * @param {Object} req - The request object containing the plant ID in the path parameters.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the plant details or an error message.
 */
const fetchPlantById = (req, res) => {
    // Get plant id from path params
    const plantId = req.params.plantId;
    // Get plant details by its id
    const plant = getPlantById(plantId);
    const message = plant ? "Retrieved plant details successfully" : "Plant details not found";
    const statusCode = plant ? 200 : 404;
    return res.status(statusCode).json({ data: plant, message });
};

// Export the controller handler functions for use in the routes
module.exports = { createPlant, fetchAllPlants, fetchPlantById };
