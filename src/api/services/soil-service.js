// src/api/services/soil-service.js

/**
 * @module soil-service
 * Ecospace Soil Service
 * 
 * @description This module provides services related to soil management in the Ecospace backend.
 * It includes functions for saving soil details, fetching all soils, fetching a soil by its ID,
 * updating soil details, and deleting a soil.
 * This service is used to interact with the soil data in the database and perform operations related to soil management.
 *
 * @requires ../../db/models/Soil
 * @exports { getSoilById, saveSoil }
 */

// Custom module imports
const { SOIL_PH_TYPE } = require("../../constants/soil-constant");
const Soil = require("../../db/models/Soil");

/**
 * @function getAllSoils
 * 
 * @description Fetches all soils from the PostgreSQL database using Sequelize.
 * This function retrieves all soil entries with pagination, sorting, and filtering options.
 * It returns an array of soil objects along with pagination metadata.
 * 
 * @param {Object} pagination - An object containing pagination parameters: limit and page.
 * @param {number} pagination.limit - The maximum number of plants to return.
 * @param {number} pagination.page - The current page number for pagination.
 * @param {Object} sorting - An object containing sorting parameters: sortBy and sortOrder.
 * @param {string} sorting.sortBy - The field to sort by (e.g., 'name').
 * @param {string} sorting.sortOrder - The order of sorting (e.g., 'asc' or 'desc').
 * @param {Object} filters - An object containing filtering parameters for soil properties.
 * @returns {Promise<Object>} - An object containing an array of soil objects and pagination metadata.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllSoils = async (pagination, sorting, filters) => {
    try {
        const { limit, page } = pagination;
        const { sortBy, sortOrder } = sorting;
        // NOTE: Adding filters directly as exact match as they are enums
        console.debug("Fetching all soils with filters: %j", filters);

        const offset = (page -1) * limit;
        // Fetch all soils with pagination, sorting, and filtering
        const { count, rows } = await Soil.findAndCountAll({
            limit, offset, order: [[sortBy, sortOrder]], where: filters
        });

        // Set pagination metadata
        const pageSize = limit;
        const totalPages = Math.ceil(count / pageSize);
        const hasPreviousPage = page < totalPages && page > 1;
        const hasNextPage = page < totalPages;
        let paginationMetadata = { currentPage: page, hasPreviousPage, hasNextPage, pageSize,
            totalItems: count, totalPages };
        
        // Set extra metadata for pagination on special cases
        const hasExceededPage = page > totalPages; // if the requested page exceeds total pages
        const maxLimitApplied = limit === 50; // if the limit is set to maximum
        if (count && hasExceededPage) paginationMetadata = { ...paginationMetadata, hasExceededPage };
        if (maxLimitApplied) paginationMetadata = { ...paginationMetadata, maxLimitApplied };
        console.debug("Fetched %d soils with pagination: %j", rows.length, paginationMetadata);

        const data = rows.map(row => row.toJSON()); // Convert Sequelize instances to plain objects
        // Return the soils and pagination metadata
        return { data, pagination: paginationMetadata };
    } catch (error) {
        console.error("Error fetching all soils: ", error?.message || error);
        throw new Error("Failed to fetch soils");
    }
};

/**
 * @function getSoilById
 * 
 * @description Fetches a soil by its ID from the PostgreSQL database using Sequelize.
 * This function retrieves a soil entry based on the provided soil ID.
 * If the soil exists, it returns the soil object; otherwise, it returns null.
 * 
 * @param {number} soilId - The ID of the soil to be fetched.
 * @returns {Promise<Object>} - The soil object if found, or null if not found
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getSoilById = async (soilId) => {
    try {
        const soil = await Soil.findByPk(soilId);
        // If soil exists, return it as a plain object or null if it doesn't exist
        return soil ? soil.toJSON() : null
    } catch (error) {
        console.error("Error fetching soil by ID: ", error?.message || error);
        throw new Error("Failed to fetch soil by ID");
    }
};

/**
 * @function saveSoil
 * 
 * @description Saves a soil to the PostgreSQL database using Sequelize.
 * This function takes soil details as input and creates a new soil entry in the database.
 * It returns the saved soil object or throws an error if the save operation fails.
 * 
 * @param {Object} soilDetails - The details of the soil to be saved.
 * @returns {Promise<Object>} - The saved soil object.
 * @throws {Error} - Throws an error if the save operation fails.
 */
const saveSoil = async (soilDetails) => {
    try {
        // Get phMin and phMax from soilDetails if they exist
        const { phMin, phMax } = soilDetails;
        if (phMin && phMax) {
            // Decide phType based on phMax
            soilDetails.phType = phMax > 7 ? SOIL_PH_TYPE.ALKALINE : phMin < 7 ? SOIL_PH_TYPE.ACIDIC : SOIL_PH_TYPE.NEUTRAL;
        }
        const soil = await Soil.create(soilDetails);
        return soil.toJSON(); // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error saving soil: ", error?.message || error);
        throw new Error("Failed to save soil");
    }
};

// Export the service functions to use in the controllers
module.exports = { getAllSoils, getSoilById, saveSoil };
