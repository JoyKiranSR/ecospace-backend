// src/api/services/plant-service.js

/**
 * @module plant-service
 * Ecospace Plant Service
 *
 * @description This module defines the service layer for plant-related operations in the Ecospace backend.
 * It includes functions to save a plant, fetch all plants, and fetch a plant by its ID.
 * @requires express-validator
 * @exports {getAllPlants, getPlantById, savePlant, updatePlantDetails} 
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
        return plant.toJSON(); // Convert the Sequelize instance to a plain object
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
 * @param {Object} pagination - An object containing pagination parameters: limit and offset.
 * @param {number} pagination.limit - The maximum number of plants to return.
 * @param {number} pagination.page - The current page number for pagination.
 * @param {Object} sorting - An object containing sorting parameters: sortBy and sortOrder.
 * @param {string} sorting.sortBy - The field to sort by (e.g., 'name').
 * @param {string} sorting.sortOrder - The order of sorting (e.g., 'asc' or 'desc').
 * @param {Object} filters - An object containing filtering parameters.
 * @param {string} filters.category - The category to filter plants by (optional).
 * @param {string} filters.growthCycle - The growth cycle to filter plants by (optional).
 * @param {string} filters.growthHabit - The growth habit to filter plants by (optional).
 * @param {string} filters.idealSeason - The ideal season to filter plants by (optional).
 * @param {string} filters.purpose - The purpose to filter plants by (optional).
 * @returns {Promise<Object>} - An object containing an array of plant objects and pagination metadata.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllPlants = async (pagination, sorting, filters) => {
    try {
        const { limit, page } = pagination;
        const { sortBy, sortOrder } = sorting;
        // NOTE: Adding filters directly as exact match as they are enums
        console.debug("Fetching all plants with filters: %j", filters);
        
        const offset = (page - 1) * limit;
        // Fetch all plants with pagination and sorting
        const { count, rows } = await Plant.findAndCountAll({
            limit, offset, order: [[sortBy, sortOrder]], where: filters,
        });

        // Set pagination metadata
        const pageSize = limit;
        const totalPages = Math.ceil(count / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;
        let paginationMetadata = { currentPage: page, hasNextPage, hasPreviousPage, pageSize,
            totalItems: count, totalPages };

        // Set extra metadata for pagination on special cases
        const hasExceededPage = page > totalPages; // if the requested page exceeds total pages
        const maxLimitApplied = limit === 100; // if the limit is set to maximum allowed (100)
        if (count && hasExceededPage) paginationMetadata = { ...paginationMetadata, hasExceededPage};
        if (maxLimitApplied) paginationMetadata = { ...paginationMetadata, maxLimitApplied };
        console.debug("Fetched %d plants with pagination: %j", rows.length, paginationMetadata);
        
        const data = rows.map(row => row.toJSON()); // Convert Sequelize instances to plain objects
        // Return plants and pagination metadata
        return { data, pagination: paginationMetadata };
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
        // Convert the Sequelize instance to a plain object if found, else return null
        return plant ? plant.toJSON() : null;
    } catch (error) {
        console.error("Error fetching plant with ID: %s", plantId, error?.message || error);
        throw new Error(`Failed to fetch plant with ID ${plantId}`);       
    }
};

/**
 * @function updatePlantDetails
 * 
 * @description Updates a plant by its ID from the PostgreSQL database using Sequelize.
 * 
 * @param {number} plantId - The ID of the plant to retrieve.
 * @param {Object} plantDetails - The details of the plant which needs to be updated.
 * @returns {Promise<Object|null>} - The updated plant object if plant found and update successful,
 * else if plant not found, returns null
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * Note: This function wont guarentee plant presence in DB for update operation, so careful to use this
 * function with proper validations on object to be updated.
 */
const updatePlantDetails = async (plantId, plantDetails) => {
    try {
        const [ updatedCount, updatedRows ] = await Plant.update(plantDetails, { where: { id: plantId }, returning: true });
        return updatedCount ? updatedRows[0].toJSON() : null; // toJSON converts the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error updating plant: ", error?.message || error);
        throw new Error("Failed to update plant");  
    }
};

module.exports = { getAllPlants, getPlantById, savePlant, updatePlantDetails };
