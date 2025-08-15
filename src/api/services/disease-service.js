// src/api/services/disease-service.js

/**
 * @module DiseaseService
 * Ecospace Disease Service
 * 
 * @description This module provides services related to disease management in the Ecospace backend.
 * It includes functions for fetching all diseases, fetching a disease by its ID, saving a disease,
 * updating a disease, and deleting a disease.
 * This service is used to interact with the disease data in the database and perform operations related to disease management.
 * 
 * @requires ../../db/models/Disease
 * @exports { getAllDiseases, getDiseaseById, saveDisease, updateDisease, deleteDisease }
 */

// Custom module imports
const Disease = require('../../db/models/Disease');

/**
 * Fetches all diseases from the PostgreSQL database using Sequelize.
 *
 * @async
 * @throws {Error} If there is an error fetching all diseases.
 * @returns {Promise<Array<Object>>} An array of disease objects.
 */
const getAllDiseases = async () => {
    // Try to get all diseases
    try {
        const diseases = await Disease.findAll();
        return diseases.map(disease => disease.toJSON()); // Convert each Sequelize instance to a plain object
    } catch (error) {
        console.error("Error fetching all diseases: ", error?.message || error);
        throw new Error("Failed to fetch all diseases");
    }
};

/**
 * Retrieves a disease by its ID.
 *
 * @async
 * @param {string} id - The ID of the disease to retrieve.
 * @throws {Error} If there is an error fetching the disease by its ID.
 * @returns {Object|null} The disease object if found, otherwise null.
 */
const getDiseaseById = async (id) => {
    try {
        const disease = await Disease.findByPk(id);
        return disease ? disease.toJSON() : null; // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error fetching disease by ID: ", error?.message || error);
        throw new Error("Failed to fetch disease by ID");
    }
};

const removeDiseaseById = async (id) => {
    // Try to remove the disease by id
    try {
        return await Disease.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting disease by ID: ", error?.message || error);
        throw new Error("Failed to delete disease by ID");
    }
};

/**
 * Saves a disease to the PostgreSQL database using Sequelize.
 *
 * @async
 * @param {Object} disease - The disease object to be saved.
 * @throws {Error} If there is an error saving the disease.
 * @returns {Promise<Object>} The saved disease object.
 */
const saveDisease = async (disease) => {
    // Try to save the disease
    try {
        const savedDisease = await Disease.create(disease);
        return savedDisease.toJSON(); // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error saving disease: ", error?.message || error);
        throw new Error("Failed to save disease");
    };
};

/**
 * Updates a disease by its ID with the provided details.
 *
 * @async
 * @param {string} id - The ID of the disease to update.
 * @param {Object} diseaseDetails - The updated details of the disease.
 * @throws {Error} If there is an error updating the disease details.
 * @returns {Promise<Object|null>} The updated disease object if updated, otherwise null.
 */
const updateDiseaseDetails = async (id, diseaseDetails) => {
    // Try to update the disease details
    try {
        const [ updatedCount, updatedRows ] = await Disease.update(diseaseDetails, { where: { id }, returning: true });
        return updatedCount ? updatedRows[0].toJSON() : null; // Convert the Sequelize instance to a plain object
    } catch (error) {
        console.error("Error updating disease details: ", error?.message || error);
        throw new Error("Failed to update disease details");
    }
};

// Export the service functions to use in the controllers
module.exports = { getAllDiseases, getDiseaseById, removeDiseaseById,
    saveDisease, updateDiseaseDetails };
