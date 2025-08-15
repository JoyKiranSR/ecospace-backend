// src/api/controllers/pest-controller.js

/**
 * @module pest-controller
 * Ecospace Pest Controller
 *
 * @description Pest controller module for the Ecospace backend.
 * This module provides controller functions for handling pest management in the Ecospace backend.
 * It includes functions for creating a new pest, fetching all pests, fetching a pest by its ID,
 * updating pest details, and deleting a pest.
 * This controller is used to interact with the pest data in the database and perform operations related to pest management.
 *
 * @requires PestService
 * @exports {createPest, deletePestById, fetchAllPests, fetchPestById, updatePestDetailsById}
 */

// Custom module imports
const { getAllPests, getPestById, removePest, savePest, updatePestDetails } = require("../services/pest-service");

/**
 * @function createPest
 * @post /pests
 *
 * @description Handles the creation of a new pest. It saves pest details 
 * received in the request body to the database and returns the newly created pest in 
 * a JSON response.
 * 
 * @param {Object} req - The request object containing the pest details in the body.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the created pest and a 201 status code 
 * if successful, or an error message with a 500 status code if the creation fails.
 */
const createPest = async (req, res) => {
    try {
        // Get the request body
        const body = req.body;
        if (!body) return res.status(400).json({ message: "Request body is required" });

        // Get the pest details from the request body
        const { control_methods: controlMethods, damage_symptoms: damageSymptoms, description,
            life_cycle: lifeCycle, name, pest_type_id: pestTypeId, scientific_name: scientifcName, seasonality  } = body;

        // Create a new pest details object with required fields
        let pestDetails = {
            controlMethods,
            damageSymptoms,
            name,
            pestTypeId,
            seasonality
        };

        // Add optional fields
        if (description) pestDetails.description = description;
        if (lifeCycle) pestDetails.lifeCycle = lifeCycle;
        if (scientifcName) pestDetails.scientifcName = scientifcName;

        // Try to save to DB
        const newPest = await savePest(pestDetails);
        return res.status(201).json({ data: newPest, message: "Pest created successfully" });
    } catch (error) {
        console.error("Error creating pest: ", error.message);
        return res.status(500).json({ error: "Failed to create pest" });
    }
};
/**
 * @function deletePestById
 * @delete /pests/:pest_id
 *
 * @description Handles the deletion of a pest by its ID.
 * It checks if the pest exists in the database and deletes it (soft delete).
 * If the pest is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the pest ID in the path parameters.
 * @param {string} req.params.pest_id - The ID of the pest to be deleted.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a response with statusCode as 204 if deletion successful,
 * or an error message with a 500 status code if the deletion fails.
 */

const deletePestById = async (req, res) => {
    try {
        // Get ID of pest from req params
        const pestId = req.params["pest_id"];
        if (!pestId) return res.status(400).json({ message: "pest_id is required" });

        // Check if the pest exists
        const pest = await getPestById(pestId);
        if (!pest) return res.status(404).json({ error: "Pest not found" });

        // Try to delete the pest
        await removePest(pestId);
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting pest: ", error.message);
        return res.status(500).json({ error: "Failed to delete pest" });
    }
};

/**
 * @function fetchAllPests
 * @get /pests
 *
 * @description Handles the retrieval of all pests from the database.
 * It fetches all pests and returns them in a JSON response with a success message.
 * If an error occurs during the process, it returns a 500 status code with an error message.
 * 
 * @param {Object} req - The request object, not used in this function.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the list of all pests and a 200 status code.
 * or an error message with a 500 status code if the fetch fails.
 */
const fetchAllPests = async (req, res) => {
    try {
        // Try to fetch from DB
        const pests = await getAllPests();
        return res.status(200).json(pests);
    } catch (error) {
        console.error("Error fetching all pests: ", error?.message || error);
        return res.status(500).json({ error: "Failed to fetch all pests" });
    }
};

/**
 * @function fetchPestById
 * @get /pests/:pest_id
 *
 * @description Handles the retrieval of a pest by its ID from the database.
 * It fetches the pest with the given ID and returns it in a JSON response with a success message.
 * If there is no pest with the given ID, it returns null.
 * 
 * @param {Object} req - The request object containing the pest ID in the path parameters.
 * @param {string} req.params.pest_id - The ID of the pest to be fetched.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the fetched pest object if found, else null and a 200 status code.
 * or an error message with a 500 status code if the fetch fails.
 */
const fetchPestById = async (req, res) => {
    try {
        // Get ID of pest from req params
        const pestId = req.params["pest_id"];
        if (!pestId) return res.status(400).json({ message: "pest_id is required" });

        // Try to fetch the pest
        const pest = await getPestById(pestId);
        return res.status(200).json({data: pest, message: "Pest fetched successfully" });
    } catch (error) {
        console.error("Error fetching pest by ID: ", error.message);
        return res.status(500).json({ error: "Failed to fetch pest by ID" });
    }
};

/**
 * @function updatePestDetailsById
 * @patch /pests/:pest_id
 *
 * @description Handles the patch update of pest details by its ID.
 * It updates the details of the pest in the database using the information provided in the request body.
 * If the pest is successfully updated, it returns the updated pest details.
 * 
 * @param {Object} req - The request object containing the pest ID in the path parameters and update details in the body.
 * @param {string} req.params.pest_id - The ID of the pest to be updated.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a JSON response with the updated pest details and a 200 status code if successful,
 * or an error message with a 500 status code if the update fails.
 */
const updatePestDetailsById = async (req, res) => {
    try {
        // Pest fields to update
        const fieldsToUpdate = ["control_methods", "damage_symptoms", "name", "pest_type_id",
            "seasonality", "description", "life_cycle", "scientific_name"];

        // Get ID of pest from req params
        const pestId = req.params["pest_id"];
        if (!pestId) return res.status(400).json({ message: "pest_id is required" });

        // Get body params from req body
        const body = req.body;
        if (!body) return res.status(400).json({ message: "Required body" });
        const bodyParams = Object.keys(body);
        if (!bodyParams.length || !bodyParams.some(param => fieldsToUpdate.includes(param)))
            return res.status(400).json({ messsage: "No details to update" });

        // Destructure to get fields to be updated
        const { control_methods: controlMethods, damage_symptoms: damageSymptoms, name, pest_type_id: pestTypeId,
            seasonality, description, life_cycle: lifeCycle, scientific_name: scientifcName } = body;
        let pestDetails = {};

        if (controlMethods) pestDetails.controlMethods = controlMethods;
        if (damageSymptoms) pestDetails.damageSymptoms = damageSymptoms;
        if (name) pestDetails.name = name;
        if (pestTypeId) pestDetails.pestTypeId = pestTypeId;
        if (seasonality) pestDetails.seasonality = seasonality;
        if (description) pestDetails.description = description;
        if (lifeCycle) pestDetails.lifeCycle = lifeCycle;
        if (scientifcName) pestDetails.scientifcName = scientifcName;

        // Try to update in DB
        const updatedPest = await updatePestDetails(pestId, pestDetails);
        return res.status(200).json({ data: updatedPest, message: "Pest details updated successfully" });
    } catch (error) {
        console.error("Error updating pest details: ", error?.message || error);
        return res.status(500).json({ error: "Failed to update pest details" });
    }
};

// Export the controller functions to use in the routes
module.exports = { createPest, deletePestById, fetchAllPests, fetchPestById, updatePestDetailsById };
