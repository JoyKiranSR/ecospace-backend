// src/api/services/pathogen-type-service.js

/**
 * @module pathogen-type-service
 * Ecospace Pathogen Type Service
 * 
 * @description This module provides services related to pathogen type management in the Ecospace backend.
 * It includes functions for saving pathogen type details, fetching all pathogen types, fetching a pathogen type by its ID,
 * updating pathogen type details, and deleting a pathogen type.
 * This service is used to interact with the pathogen type data in the database and perform operations related to pathogen type management.
 *
 * @requires ../../db/models/PathogenType
 * @exports { getAllPathogenTypes, getPathogenTypeById, savePathogenType, updatePathogenTypeDetails }
 */

// Custom module imports
const PathogenType = require("../../db/models/PathogenType");

/**
 * @function getAllPathogenTypes
 * @description Fetches all pathogen types from the PostgreSQL database using Sequelize.
 * @async
 *
 * @returns {Promise<Array<Object>>} - An array of pathogen type objects.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const getAllPathogenTypes = async () => {
    // Try to fetch all pathogen types
    try {
        const pathogenTypes = await PathogenType.findAll();
        return pathogenTypes.map(pathogenType => pathogenType.toJSON()); // Convert each Sequelize instance to a plain object
    } catch (error) {
        console.error("Error fetching all pathogen types: ", error?.message || error);
        throw new Error("Failed to fetch all pathogen types");
    }
};

/**
 * @function getPathogenTypeById
 * @description Retrieves a pathogen type by its ID.
 *
 * @async
 * @param {string} id - The ID of the pathogen type to retrieve.
 * @throws {Error} If there is an error fetching the pathogen type by its ID.
 * @returns {Object|null} The pathogen type object if found, otherwise null.
 */
const getPathogenTypeById = async (id) => {
    // Try to find pathogen type by ID
    try {
        const pathogenType = await PathogenType.findByPk(id);
        return pathogenType ? pathogenType.toJSON() : null; // Convert the Sequelize instance to a plain object if found
    } catch (error) {
        console.error("Error fetching pathogen type by ID: ", error?.message || error);
        throw new Error("Failed to fetch pathogen type by ID");
    }
};

/**
 * @function removePathogenType
 * @description Removes a pathogen type by its ID.
 *
 * @async
 * @param {string} pathogenTypeId - The ID of the pathogen type to remove.
 * @throws {Error} If there is an error removing the pathogen type by its ID.
 * @returns {Promise<number>} The number of rows deleted.
 */
const removePathogenType = async (pathogenTypeId) => {
    // Try to delete pathogen type
    try {
        return await PathogenType.destroy({ where: { id: pathogenTypeId } });
    } catch (error) {
        console.error("Error removving pathogen type: ", error?.message || error);
        throw new Error("Failed to remove pathogen type");
    }
};

/**
 * @function savePathogenType
 * @description Saves a pathogen type to the database.
 *
 * @async
 * @param {Object} pathogenTypeDetails - The details of the pathogen type to be saved.
 * @throws {Error} If there is an error saving the pathogen type to the database.
 * @returns {Promise<Object>} The saved pathogen type object.
 */
const savePathogenType = async (pathogenTypeDetails) => {
    // Try to save pathogen type to DB
    try {
        const pathogenType = await PathogenType.create(pathogenTypeDetails);
        return pathogenType.toJSON(); // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error saving pathogen type: ", error?.message || error);
        throw new Error("Failed to save pathogen type");
    }
};

/**
 * @function updatePathogenTypeDetails
 * @description Updates a pathogen type by its ID.
 * @async
 * 
 * @param {string} pathogenTypeId - The ID of the pathogen type to update.
 * @param {Object} pathogenTypeDetails - The updated details of the pathogen type.
 *

 * @throws {Error} If there is an error updating the pathogen type by its ID.
 * @returns {Promise<Object|null>} The updated pathogen type object if updated, otherwise null.
 */
const updatePathogenTypeDetails = async (pathogenTypeId, pathogenTypeDetails) => {
    // Try to update pathogen type details
    try {
        const [ updatedCount, updatedRows ] = await PathogenType.update(pathogenTypeDetails, { where: { id: pathogenTypeId }, returning: true }); // returning: true to get the updated object
        return updatedCount ? updatedRows[0].toJSON() : null; // Convert the Sequelize instance to a plain object if updated
    } catch (error) {
        console.error("Error updating pathogen type details: ", error?.message || error);
        throw new Error("Failed to update pathogen type details");
    }
};

// Export the functions to use in the controllers
module.exports = { getAllPathogenTypes, getPathogenTypeById, removePathogenType,
    savePathogenType, updatePathogenTypeDetails };
