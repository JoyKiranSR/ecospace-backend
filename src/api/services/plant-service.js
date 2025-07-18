// src/api/services/plant-service.js

/**
 * @module plant-service
 * Ecospace Plant Service
 *
 * @description This module defines the service layer for plant-related operations in the Ecospace backend.
 * It includes functions to save a plant, fetch all plants, and fetch a plant by its ID.
 * @requires express-validator
 * @exports {getAllPlants, getPlantById, savePlant} 
 */

/**
 * @function initPlantsDB
 *
 * @description Initializes a simple in-memory database for plants.
 * It uses a Map to store plants with an auto-incrementing ID.
 * Each plant is stored as an object with its details.
 * The Map allows for efficient retrieval and storage of plant objects.
 * 
 * @returns {Object} - An object containing methods to add a plant, get all plants, and get a plant by its ID.
 * 
 * Notes:
 * - This is a simple in-memory database implementation for demonstration purposes.
 * - In a production environment, you would typically use a proper database like MongoDB, PostgreSQL, etc.
 * - This implementation does not persist data across server restarts.
 * - The counter is used to generate unique IDs for each plant.
 * - The plants are stored in a Map for efficient access and manipulation.
 * - Implementation is synchronous and does not handle concurrency issues.
 * - Implemented using closures to encapsulate the database logic and state.
 */
const initPlantsDB = () => {
    // In-memory database using a Map to store plants
    let counter = 0;
    const plants = new Map();

    return {
        /**
         * @function add
         * 
         * @description Adds a new plant to the in-memory database.
         * It increments the counter to assign a unique ID to each plant.
         * 
         * @param {Object} plant - The plant object to be added.
         * @returns {Object} - The added plant object with its ID.
         */
        add: (plant) => {
            plants.set(++counter, plant);
            console.log(plants)
            return plants.get(counter);
        },
        /**
         * @function getAll
         * 
         * @description Retrieves all plants from the in-memory database.
         * It returns an array of all plant objects stored in the Map.
         * 
         * @returns {Array} - An array of all plant objects.
         */
        getAll: () => Array.from(plants.values()),
        /**
         * @function getById
         * 
         * @description Retrieves a plant by its ID from the in-memory database.
         * It checks if the plant exists and returns it, or null if not found.
         * 
         * @param {number} id - The ID of the plant to retrieve.
         * @returns {Object|null} - The plant object if found, or null if not found.
         */
        getById: (id) => plants.get(id) ?? null
    }
};

// Initialize the in-memory database for plants
const plantDB = initPlantsDB();

/**
 * @function savePlant
 * 
 * @description Saves a plant to the in-memory database.
 * It creates a new plant object from the provided details and adds it to the database.
 * 
 * @param {Object} plantDetails - The details of the plant to be saved.
 * @return {Object} - The saved plant object with its ID. 
 */
const savePlant = (plantDetails) => {
    // Create a new Plant object out of the plant details
    let plant = Object.create({});
    plant = { ...plantDetails };
    // Save to DB
    return plantDB.add(plant);
};

/**
 * @function getAllPlants
 * 
 * @description Fetches all plants from the in-memory database.
 * It retrieves all plant objects stored in the database and returns them.
 * 
 * @returns {Array} - An array of all plant objects.
 */
const getAllPlants = () => {
    // Fetch all plants from DB
    return plantDB.getAll();
};

/**
 * @function getPlantById
 * 
 * @description Fetches a plant by its ID from the in-memory database.
 * It checks if the plant exists and returns it, or null if not found.
 * 
 * @param {number} plantId - The ID of the plant to retrieve.
 * @returns {Object|null} - The plant object if found, or null if not found.
 */
const getPlantById = (plantId) => {
    // Fetch a plant by its id from DB
    return plantDB.getById(parseInt(plantId));
};

// Export the service functions for use in the controller
module.exports = { getAllPlants, getPlantById, savePlant };
