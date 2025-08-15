// src/api/controllers/pathogen-type-controller.js

/**
 * @module pathogen-type-controller
 * Ecospace Pathogen Type Controller
 *
 * @description This module defines the controller to handle pathogen type-related endpoints in the Ecospace backend.
 * It includes functions to fetch all pathogen types and fetch a pathogen type by its ID.
 *
 * @requires pathogen-type-service
 * @exports { createPathogenType, deletePathogenType, fetchAllPathogenTypes, fetchPathogenTypeById, updatePathogenType }
 */

// Custom module imports
const { toSnakeCaseKeys } = require("../../utils/common");
const { getAllPathogenTypes, getPathogenTypeById, removePathogenType,
    savePathogenType, updatePathogenTypeDetails } = require("../services/pathogen-type-service");

/**
 * @function createPathogenType
 * @post /pathogen-types
 * @description Handles the API endpoint to create a new pathogen type.
 * It retrieves the pathogen type details from the request body, creates a new pathogen type object,
 * and saves it to the database.
 * If the request body is empty, it returns a 400 status code with an error message.
 * If the pathogen type is created successfully, it returns a 201 status code with the created pathogen type object and a success message.
 * If there is an error creating the pathogen type, it logs the error and returns a 500 status code with an error message.
*
 * @async
 * @param {Object} req - The request object with the pathogen type details in the body.
 * @param {Object} req.body - The pathogen type details.
 * @param {string} req.body.name - The name of the pathogen type.
 * @param {string} [req.body.description] - The optional description of the pathogen type.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the created pathogen type object, a success message, or an error message.
 */
const createPathogenType = async (req, res) => {
    // Get the pathogen type details from the request body
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Required body" });

    // Destructure the pathogen type details from the request body
    const { name, description } = body;

    // Add mandatory fields
    let pathogenTypeDetails = { name };
    // Add optional fields
    if (description) pathogenTypeDetails.description = description;

    // Try to create a new pathogen type
    try {
        const pathogenType = await savePathogenType(pathogenTypeDetails);
        return res.status(201).json({ data: toSnakeCaseKeys(pathogenType), message: "Pathogen type created successfully" });
    } catch (error) {
        console.error("Error creating pathogen type: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function deletePathogenType
 * @delete /pathogen-types/:pathogen_type_id
 * @description Handles the API endpoint to delete a pathogen type by its ID.
 * It retrieves the pathogen type ID from the request parameters, deletes the pathogen type from the database,
 * and sends an empty response with a 204 status code.
 * If the pathogen type is not found, it returns a 404 status code with an error message.
 * If an error occurs, it logs the error and sends a 500 status code with an error message.
 *
 * @async
 * @param {Object} req - The request object with the pathogen type ID in the parameters.
 * @param {string} req.params.pathogen_type_id - The ID of the pathogen type to be deleted.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns an empty response with a 204 status code, a success message, or an error message.
 */
const deletePathogenType = async (req, res) => {
    // Get pathogen type ID from request parameters
    const pathogenTypeId = req.params["pathogen_type_id"];
    
    // Try to delete pathogen type
    try {
        const pathogenType = await removePathogenType(pathogenTypeId);
        if (!pathogenType) return res.status(404).json({ message: "Pathogen type not found" });
        return res.status(204).end();
    } catch (error) {
        console.error("Error deleting pathogen type by ID: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function fetchAllPathogenTypes
 * @get /pathogen-types
 * @description Handles the API endpoint to fetch all pathogen types.
 * It retrieves all pathogen types from the database and sends them in a JSON response.
 * If an error occurs, it logs the error and sends a 500 status code with an error message.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the list of pathogen types, a success message, or an error message.
 */
const fetchAllPathogenTypes = async (_req, res) => {
    // Try to fetch all pathogen types
    try {
        const pathogenTypes = await getAllPathogenTypes();
        return res.status(200).json({ data: toSnakeCaseKeys(pathogenTypes), message: "Retrieved all pathogen types successfully" });
    } catch (error) {
        console.error("Error fetching all pathogen types: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function fetchPathogenTypeById
 * @get /pathogen-types/:pathogen_type_id
 * @description Handles the API endpoint to fetch a pathogen type by its ID.
 * It retrieves a pathogen type from the database and sends it in a JSON response.
 * If the pathogen type is not found, it returns a 404 status code with an error message.
 * If an error occurs, it logs the error and sends a 500 status code with an error message.
 *
 * @async
 * @param {Object} req - The request object with the pathogen type ID in the parameters.
 * @param {string} req.params.pathogen_type_id - The ID of the pathogen type to be fetched.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the pathogen type, a success message, or an error message.
 */
const fetchPathogenTypeById = async (req, res) => {
    // Get pathogen type ID from request parameters
    const pathogenTypeId = req.params["pathogen_type_id"];
    if (!pathogenTypeId) return res.status(400).json({ message: "Required pathogen type ID" });

    // Try to fetch pathogen type
    try {
        const pathogenType = await getPathogenTypeById(pathogenTypeId);
        if (!pathogenType) {
            return res.status(404).json({ data: null, message: "Pathogen type not found" });
        }
        return res.status(200).json({ data: toSnakeCaseKeys(pathogenType), message: "Retrieved pathogen type successfully" });
    } catch (error) {
        console.error("Error fetching pathogen type by ID: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function updatePathogenType
 * @patch /pathogen-types/:pathogen_type_id
 * @description Handles the API endpoint to update a pathogen type by its ID.
 * It retrieves the pathogen type ID from the request parameters, and the pathogen type details to update from the request body.
 * It creates a pathogen type details object and calls the updatePathogenTypeDetails function to update the pathogen type in the database.
 * If the request body is empty, it returns a 400 status code with an error message.
 * If no fields to update are provided in the request body, it returns a 400 status code with an error message.
 * If the pathogen type is not found, it returns a 404 status code with an error message.
 * If the pathogen type is updated successfully, it returns a 200 status code with the updated pathogen type object and a success message.
 * If an error occurs, it logs the error and returns a 500 status code with an error message.
 *
 * @async
 * @param {Object} req - The request object with the pathogen type ID in the parameters and the pathogen type details to update in the body.
 * @param {string} req.params.pathogen_type_id - The ID of the pathogen type to be updated.
 * @param {Object} req.body - The pathogen type details to update.
 * @param {string} [req.body.name] - The updated name of the pathogen type.
 * @param {string} [req.body.description] - The updated optional description of the pathogen type.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} - Returns a JSON response with the updated pathogen type object, a success message, or an error message.
 */
const updatePathogenType = async (req, res) => {
    // List of fields that can be updated
    const fieldsToUpdate = [ "name", "description" ];

    // Get pathogen type ID from request parameters
    const pathogenTypeId = req.params["pathogen_type_id"];
    if (!pathogenTypeId) return res.status(400).json({ message: "Required pathogen type ID" });

    // Get pathogen type details from request body
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Required body" });
    const bodyparams = Object.keys(body);
    if (!bodyparams.length || !bodyparams.some((param) => fieldsToUpdate.includes(param))) return res.status(400).json({ message: "No fields to update" });

    // Destructure the pathogen type details from the request body
    const { name, description } = body;

    // Create pathogen type details object to update
    const pathogenTypeDetails = {};
    if (name) pathogenTypeDetails.name = name;
    if (description) pathogenTypeDetails.description = description;

    // Try to update pathogen type details
    try {
        const pathogenType = await updatePathogenTypeDetails(pathogenTypeId, pathogenTypeDetails);
        if (!pathogenType) return res.status(404).json({ message: "Pathogen type not found" });
        return res.status(200).json({ data: toSnakeCaseKeys(pathogenType), message: "Updated pathogen type successfully" });
    } catch (error) {
        console.error("Error updating pathogen type by ID: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}
// Export the functions to use in the routes
module.exports = { createPathogenType, deletePathogenType, fetchAllPathogenTypes, fetchPathogenTypeById,
    updatePathogenType };
