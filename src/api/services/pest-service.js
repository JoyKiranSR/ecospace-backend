// src/api/services/pest-service.js

/**
 * @module pest-service
 * Ecospace Pest Service
 *
 * @description Pest service module for the Ecospace backend.
 * This module provpestIdes services related to pest management in the Ecospace backend.
 * It includes functions for saving pest details, fetching all pests, fetching a pest by its ID,
 * updating pest details, and deleting a pest.
 * This service is used to interact with the pest data in the database and perform operations related to pest management.
 * 
 * @requires Pest
 * @exports {getAllPests, removePest, savePest, updatePestDetails}
 */

// Custom module imports
const Pest = require("../../db/models/Pest");

/**
 * @function getAllPests
 *
 * @description Fetches all pests from the database.
 * It fetches all pests, including inactive ones, and returns them in a JSON response with a success message.
 * If there are no pests, it returns an empty array.
 * 
 * @returns {Promise<Array<Pest>>} - Resolves with an array of Pest plain objects.
 * @throws {Error} - If there is an error fetching all pests.
 */
const getAllPests = async () => {
    // Try to fetch all pests
  try {
    const pests = await Pest.findAll();
    return pests.map(pest => pest.toJSON()); // Convert to plain objects
  } catch (error) {
    console.error("Error fetching all pests: ", error?.message || error);
    throw new Error("Failed to fetch all pests");
  }
};

/**
 * @function getPestById
 *
 * @description Fetches a pest by its ID from the database.
 * It fetches the pest with the given ID and returns it in a JSON response with a success message.
 * If there is no pest with the given ID, it returns null.
 * 
 * @param {string} pestId - The ID of the pest to be fetched.
 * @returns {Promise<Object|null>} - The fetched pest object if found, else null.
 * @throws {Error} - If there is an error fetching the pest.
 */
const getPestById = async (pestId) => {
  try {
    const pest = await Pest.findByPk(pestId);
    return pest ? pest.toJSON() : null; // Convert to plain object if found, else return null
  } catch (error) {
    console.error("Error fetching pest with ID: %s", pestId, error?.message || error);
    throw new Error(`Failed to fetch pest with ID ${pestId}`);
  }
};

/**
 * @function removePest
 *
 * @description - Removes a pest from the database by its ID.
 * It soft deletes the record, so it can be restored later.
 *
 * @param {string} pestId - ID of the pest to be deleted.
 * @returns {Promise<number | null>} - Resolves with the count of the deleted pest(s) or null if not found.
 * @throws {Error} - If there is an error removing the pest.
 */
const removePest = async (pestId) => {
    // Try to remove from DB
    try {
        const deletedCount = await Pest.destroy({ where: { id: pestId } }); // Soft deletes as schema includes paronoid true
        return deletedCount ?? null;
    } catch (error) {
        console.error("Error removing pest: ", error?.message || error);
        throw new Error("Failed to remove pest");
    }
};

/**
 * @function savePest
 *
 * @description Saves a new pest to the database. Converts the sequelize model
 * instance to a plain object before returning.
 *
 * @param {Object} pestDetails - Details of the pest to be saved.
 * @returns {Promise<Object>} - Resolves with the saved pest as a plain object.
 * @throws {Error} - If there is an error saving the pest.
 */
const savePest = async (pestDetails) => {
    // Try to save to DB
    try {
        const savedPest = await Pest.create(pestDetails);
        return savedPest.toJSON(); // Convert to plain object
    } catch (error) {
        console.error("Error saving pest: ", error?.message || error);
        throw new Error("Failed to save pest");
    }
};

/**
 * @function updatePestDetails
 *
 * @description Updates a pest by its ID from the database using Sequelize.
 *
 * @param {string} pestId - The ID of the pest to update.
 * @param {Object} pestDetails - The details of the pest to be updated.
 * @returns {Promise<Object|null>} - The updated pest object if update successful,
 * or null if pest not found.
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * NOTE: This function won't guarentee pest presence in DB for update operation, so careful to use this
 * function with proper validations on object to be updated.
 */
const updatePestDetails = async (pestId, pestDetails) => {
    // Try to update in DB
    try {
        const [ updatedCount, updatedRows] = await Pest.update(pestDetails, { where: { id: pestId }, returning: true });
        return updatedCount ? updatedRows[0].toJSON() : null;
    } catch (error) {
        console.error("Error updating pest details: ", error?.message || error);
        throw new Error("Failed to update pest details");
    }
};

// Export the service functions to use in the controllers
module.exports = { getAllPests, getPestById, removePest, savePest, updatePestDetails };
