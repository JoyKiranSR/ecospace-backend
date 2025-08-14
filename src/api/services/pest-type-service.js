// src/api/services/pest-type-service.js

/**
 * @module pest-type-service
 * Ecospace PestType Service
 *
 * @description PestType service module for the Ecospace backend.
 * This module provides services related to pest type management in the Ecospace backend.
 * It includes functions for saving pest type details, fetching all pest types, fetching a pest type by its ID,
 * updating pest type details, and deleting a pest type.
 * This service is used to interact with the pest type data in the database and perform operations related to pest type management.
 * 
 * @requires PestType
 * @exports {getAllPestTypes, removePestType, savePestType, updatePestTypeDetails}
 */

// Custom module imports
const PestType = require("../../db/models/PestType");

/**
 * @function getAllPestTypes
 *
 * @description - Fetches all pest types from the database.
 *
 * @param {boolean} [isIncludeInActive=false] - Whether to include inactive records (soft deleted).
 * @returns {Promise<Array<PestType>>} - Resolves with an array of PestType plain objects.
 * @throws {Error} - If there is an error fetching all pest types.
 */
const getAllPestTypes = async (isIncludeInActive = false) => {
    // Try to fetch all types
    try {
        const pestTypes = await PestType.findAll(isIncludeInActive ? { paranoid: false } : {}); // Excludes soft deleted records as paronoid true
        return pestTypes.map(pestType => pestType.toJSON()); // Convert to plain objects
    } catch (error) {
        console.error("Error fetching all pest types: ", error?.message || error);
        throw new Error("Failed to fetch all pest types");
    } 
};

/**
 * @function removePestType
 *
 * @description - Removes a pest type from the database by its ID.
 * It soft deletes the record, so it can be restored later.
 *
 * @param {string} pestTypeId - ID of the pest type to be deleted.
 * @returns {Promise<number | null>} - Resolves with the count of the deleted pest type(s) or null if not found.
 * @throws {Error} - If there is an error removing the pest type.
 */
const removePestType = async (pestTypeId) => {
    // Try to remove from DB
    try {
        const deletedCount = await PestType.destroy({ where: { id: pestTypeId } }); // Soft deletes as schema includes paronoid true
        return deletedCount ?? null;
    } catch (error) {
        console.error("Error removing pest type: ", error?.message || error);
        throw new Error("Failed to remove pest type");
    }
};

/**
 * @function savePestType
 *
 * @description - Saves a new pest type to the database.
 * Converts the sequelize model instance to a plain object before returning.
 *
 * @param {Object} pestTypeDetails - Details of the pest type to be saved.
 * @returns {Promise<Object>} - Resolves with the saved pest type as a plain object.
 * @throws {Error} - If there is an error saving the pest type.
 */
const savePestType = async (pestTypeDetails) => {
    // Try to save to DB
    try {
        const pestType = await PestType.create(pestTypeDetails);
        return pestType.toJSON(); // Convert to plain object from sequelize instance
    } catch (error) {
        console.error("Error saving pest type: ", error?.message || error);
        throw new Error("Failed to save pest type");
    }
};

/**
 * @function updatePestTypeDetails
 *
 * @description Updates a pest type by its ID from the database using Sequelize.
 *
 * @param {string} pestTypeId - The ID of the pest type to update.
 * @param {Object} pestTypeDetails - The details of the pest type to be updated.
 * @returns {Promise<Object|null>} - The updated pest type object if update successful,
 * or null if pest type not found.
 * @throws {Error} - Throws an error if the update operation fails.
 */
const updatePestTypeDetails = async (pestTypeId, pestTypeDetails) => {
    // Try to update pest type details
    try {
        const [ updatedCount, updatedRows ] = await PestType.update(pestTypeDetails, { where: { id: pestTypeId }, returning: true }); // returns updated result
        return updatedCount ? updatedRows[0].toJSON() : null; // Return converted plain object if updated, else return null
    } catch (error) {
        console.error("Error updating pest type details: ", error?.message || error);
        throw new Error("Failed to update pest type details");
    }
};

/**
 * @function pestTypeService
 * @description Creates a PestType service for pest type management operations.
 * The service provides methods for fetching all pest types, removing a pest type by its ID,
 * saving a new pest type, and updating pest type details by its ID.
 * 
 * @returns {Object} - Object containing the above methods.
 */
const pestTypeService = () => {
    return {
        getAll: getAllPestTypes,
        remove: removePestType,
        save: savePestType,
        update: updatePestTypeDetails,
    }
};

// Export service functions to use in the controllers
module.exports = { pestTypeService };
