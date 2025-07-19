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

// Custom module imports
const Plant = require('../../db/models/Plant');

/**
 * @function savePlant
 * 
 * @description Saves a plant to the PostgreSQL database using Sequelize.
 * 
 * @param {Object} plantDetails - The details of the plant to be saved.
 * @return {Promise<Object>} - The saved plant object.
 * @throws {Error} - Throws an error if the save operation fails.
 */
const savePlant = async (plantDetails) => {
    try {
        const plant = await Plant.create(plantDetails);
        return plant;
    } catch (error) {
        console.error("Error saving plant: ", error?.message || error);
        throw new Error("Failed to save plant");        
    }
};

/**
 * @function getAllPlants
 * 
 * @description Fetches all plants from the PostgreSQL database using Sequelize.
 * 
 * @returns {Promise<Array>} - An array of all plant objects.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllPlants = async () => {
    try {
        const plants = await Plant.findAll();
        return plants;
    } catch (error) {
        console.error("Error fetching all plants: ", error?.message || error);
        throw new Error("Failed to fetch plants");        
    }
};

/**
 * @function getPlantById
 * 
 * @description Fetches a plant by its ID from the PostgreSQL database using Sequelize.
 * 
 * @param {number} plantId - The ID of the plant to retrieve.
 * @returns {Promise<Object|null>} - The plant object if found, or null if not found.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getPlantById = async (plantId) => {
    try {
        const plant = await Plant.findByPk(plantId);
        return plant;
    } catch (error) {
        console.error(`Error fetching plant with ID ${plantId}:`, error?.message || error);
        throw new Error(`Failed to fetch plant with ID ${plantId}`);       
    }
};

module.exports = { getAllPlants, getPlantById, savePlant };
