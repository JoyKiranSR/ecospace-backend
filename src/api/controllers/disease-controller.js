// src/api/controllers/disease-controller.js

/**
 * @module DiseaseController
 * Ecospace Disease Controller
 * 
 * @description This module provides controller functions for disease management in the Ecospace backend.
 * It includes functions for creating a new disease, fetching all diseases, fetching a disease by its ID,
 * updating a disease, and deleting a disease.
 * This controller is used to interact with the disease data in the database and perform operations related to disease management.
 * 
 * @requires ../../db/models/Disease
 * @exports { createDisease, deleteDisease, fetchAllDiseases, fetchDiseaseById, updateDiseaseById }
 */

// Custom module imports
const { toSnakeCaseKeys } = require('../../utils/common');
const { getAllDiseases, getDiseaseById, removeDiseaseById, saveDisease, updateDiseaseDetails } = require('../services/disease-service');

/**
 * @function createDisease
 * @post /diseases
 * @description Creates a new disease in the database.
 * Saves the disease details provided in the request body.
 * Returns a JSON response with the created disease object, a success message, or an error message.
 * Returns an error message if there is an error saving the disease.
 *
 * @async
 * @param {Object} req - The request object containing the disease details in the body.
 * @param {Object} req.body - The disease details.
 * @param {string} req.body.control_methods - The control methods for the disease.
 * @param {string} req.body.damage_symptoms - The damage symptoms of the disease.
 * @param {string} req.body.name - The name of the disease.
 * @param {string} req.body.pathogen_type_id - The ID of the pathogen type associated with the disease.
 * @param {string} req.body.seasonality - The seasonality of the disease.
 * @param {string} req.body.spread_method - The spread method of the disease.
 * @param {string} [req.body.description] - The optional description of the disease.
 * @param {string} [req.body.life_cycle] - The optional life cycle of the disease.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the created disease object, a success message, or an error message.
 */
const createDisease = async (req, res) => {
    // Get request body
    const body = req.body;
    if (!body) return res.status(400).json({ error: "Request body is required" });

    // Get the disease details from the request body
    const { control_methods: controlMethods, damage_symptoms: damageSymptoms, name,
        pathogen_type_id: pathogenTypeId, seasonality, spread_method: spreadMethod,
        description, life_cycle: lifeCycle } = body;
    
    // Add mandatory fields
    const diseaseDetails = { controlMethods, damageSymptoms, name, pathogenTypeId, seasonality, spreadMethod };
    // Add optional fields
    if (description) diseaseDetails.description = description;
    if (lifeCycle) diseaseDetails.lifeCycle = lifeCycle;

    // Try to save the disease
    try {
        const disease = await saveDisease(diseaseDetails);
        return res.status(201).json({ data: toSnakeCaseKeys(disease), message: "Disease created successfully" });
    } catch (error) {
        console.error("Error creating disease: ", error.message);
        return res.status(500).json({ error: "Failed to create disease" });
    }
};

/**
 * @function deleteDisease
 * @delete /diseases/:disease_id
 * @description Deletes a disease from the database by its ID.
 * Fetches the disease by ID, deletes it if found, and returns a JSON response with a success message or an error message.
 * Returns an error message if there is an error deleting the disease.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {string} req.params.disease_id - The ID of the disease to delete.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with a success message or an error message.
 */
const deleteDisease = async (req, res) => {
    // Get disease ID from request params
    const diseaseId = req.params["disease_id"];
    if (!diseaseId) return res.status(400).json({ error: "Disease ID is required" });

    // Try to fetch and delete the disease
    try {
        const deletedDisease = await getDiseaseById(diseaseId);
        if (!deletedDisease) return res.status(404).json({ message: "Disease not found" });

        // Try to delete the disease
        await removeDiseaseById(diseaseId);
        return res.status(204).end();
    } catch (error) {
        console.error("Error deleting disease by ID: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function fetchAllDiseases
 * @get /diseases
 * @description Fetches all diseases from the database and returns them in a JSON response.
 * If there is an error fetching the diseases, it logs the error and sends a 500 status code with an error message.
 *
 * @async
 * @param {Object} _req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the list of diseases, a success message, or an error message.
 */
const fetchAllDiseases = async (_req, res) => {
    // Try to fetch all diseases
    try {
        const diseases = await getAllDiseases();
        return res.status(200).json({ data: toSnakeCaseKeys(diseases), message: "All diseases fetched successfully" });
    } catch (error) {
        console.error("Error fetching all diseases: ", error.message);
        return res.status(500).json({ error: "Failed to fetch all diseases" });
    }
};

/**
 * @function fetchDiseaseById
 * @get /diseases/:disease_id
 * @description Fetches a disease by its ID from the database and returns it in a JSON response.
 * If the disease ID is not provided in the request params, it returns a 400 status code with an error message.
 * If the disease is not found, it returns a 404 status code with a message.
 * If there is an error fetching the disease, it logs the error and returns a 500 status code with an error message.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {string} req.params.disease_id - The ID of the disease to fetch.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the fetched disease, a success message, or an error message.
 */
const fetchDiseaseById = async (req, res) => {
    // Get disease ID from request params
    const diseaseId = req.params["disease_id"];
    if (!diseaseId) return res.status(400).json({ error: "Disease ID is required" });

    // Try to fetch the disease
    try {
        const disease = await getDiseaseById(diseaseId);
        if (!disease) return res.status(404).json({ message: "Disease not found" });
        return res.status(200).json({ data: toSnakeCaseKeys(disease), message: "Disease fetched successfully" });
    } catch (error) {
        console.error("Error fetching disease by ID: ", error.message);
        return res.status(500).json({ error: "Failed to fetch disease by ID" });
    }
};

/**
 * @function updateDiseaseById
 * @patch /diseases/:disease_id
 * @description Updates a disease by its ID with the provided details.
 * Fetches the disease by ID, updates it if found, and returns a JSON response with the updated disease object,
 * a success message, or an error message.
 * Returns an error message if the disease ID is not provided in the request params, if the request body
 * is not provided, if there are no valid fields to update, or if there is an error updating the disease details.
 * 
 * @async
 * @param {Object} req - The request object containing the disease details in the body.
 * @param {string} req.params.disease_id - The ID of the disease to update.
 * @param {Object} req.body - The updated details of the disease.
 * @throws {Error} If there is an error updating the disease details.
 * @returns {Promise<Object|null>} The updated disease object if updated, otherwise null.
 */
const updateDiseaseById = async (req, res) => {
    // Fields to update
    const updateFields = ["control_methods", "damage_symptoms", "name", "pathogen_type_id", "seasonality",
        "spread_method", "description", "life_cycle"];

    // Get disease ID from request params
    const diseaseId = req.params["disease_id"];
    if (!diseaseId) return res.status(400).json({ error: "Disease ID is required" });

    // Get request body
    const body = req.body;
    if (!body) return res.status(400).json({ error: "Request body is required" });

    // Get body fields
    const bodyFields = Object.keys(body);
    if (!bodyFields.length || !bodyFields.some(field => updateFields.includes(field)))
        return res.status(400).json({ error: "No valid fields to update" });

    // Get disease details from request body
    const { control_methods: controlMethods, damage_symptoms: damageSymptoms, name, pathogen_type_id: pathogenTypeId,
        seasonality, spread_method: spreadMethod, description, life_cycle: lifeCycle } = body;

    // Add disease details to an object
    const diseaseDetails = {};
    if (controlMethods) diseaseDetails.controlMethods = controlMethods;
    if (damageSymptoms) diseaseDetails.damageSymptoms = damageSymptoms;
    if (name) diseaseDetails.name = name;
    if (pathogenTypeId) diseaseDetails.pathogenTypeId = pathogenTypeId;
    if (seasonality) diseaseDetails.seasonality = seasonality;
    if (spreadMethod) diseaseDetails.spreadMethod = spreadMethod;
    if (description) diseaseDetails.description = description;
    if (lifeCycle) diseaseDetails.lifeCycle = lifeCycle;
    
    // Try to update the disease details
    try {
        const updatedDisease = await updateDiseaseDetails(diseaseId, diseaseDetails);
        if (!updatedDisease) return res.status(404).json({ message: "Disease not found" });
        return res.status(200).json({ data: toSnakeCaseKeys(updatedDisease), message: "Disease details updated successfully" });
    } catch (error) {
        console.error("Error updating disease details: ", error?.message || error);
        return res.status(500).json({ error: "Failed to update disease details" });
    }
};

// Export the controller functions to use in the routes
module.exports = { createDisease, deleteDisease, fetchAllDiseases, fetchDiseaseById, updateDiseaseById };
