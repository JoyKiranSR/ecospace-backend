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
 * @param {Object} pagination - An object containing pagination parameters: limit and offset.
 * @param {number} pagination.limit - The maximum number of plants to return.
 * @param {number} pagination.page - The current page number for pagination.
 * @param {Object} sorting - An object containing sorting parameters: sortBy and sortOrder.
 * @param {string} sorting.sortBy - The field to sort by (e.g., 'name').
 * @param {string} sorting.sortOrder - The order of sorting (e.g., 'asc' or 'desc').
 * @returns {Promise<Object>} - An object containing an array of plant objects and pagination metadata.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllPlants = async (pagination, sorting) => {
    try {
        const { limit, page } = pagination;
        const { sortBy, sortOrder } = sorting;
        const offset = (page - 1) * limit;
        // Fetch all plants with pagination and sorting
        const { count, rows } = await Plant.findAndCountAll({ limit, offset, order: [[sortBy, sortOrder]] });

        // Set pagination metadata
        const pageSize = limit;
        const totalPages = Math.ceil(count / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;
        let paginationMetadata = { currentPage: page, hasNextPage, hasPreviousPage, pageSize, totalItems: count, totalPages };

        // Set extra metadata for pagination on special cases
        const hasExceededPage = page > totalPages; // if the requested page exceeds total pages
        const maxLimitApplied = limit === 100; // if the limit is set to maximum allowed (100)
        if (hasExceededPage) paginationMetadata = { ...paginationMetadata, hasExceededPage};
        if (!hasExceededPage && maxLimitApplied) paginationMetadata = { ...paginationMetadata, maxLimitApplied };
        console.debug("Fetched %d plants with pagination: %j", rows.length, paginationMetadata);
        
        // Return the rows and pagination metadata
        return { data: rows, pagination: paginationMetadata };
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
        console.error("Error fetching plant with ID: %s", plantId, error?.message || error);
        throw new Error(`Failed to fetch plant with ID ${plantId}`);       
    }
};

module.exports = { getAllPlants, getPlantById, savePlant };
