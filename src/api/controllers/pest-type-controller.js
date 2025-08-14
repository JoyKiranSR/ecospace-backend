// src/api/controllers/pest-type-controller.js

/**
 * @module pest-type-controller
 * Ecospace PestType Controller
 *
 * @description PestType controller module for the Ecospace backend.
 * This module provides controller functions for handling pest type management in the Ecospace backend.
 * It includes functions for creating a new pest type, fetching all pest types, fetching a pest type by its ID,
 * updating pest type details, and deleting a pest type.
 * This controller is used to interact with the pest type data in the database and perform operations related to pest type management.
 *
 * @requires PestTypeService
 * @exports {createPestType, deletePestTypeById, fetchAllPestTypes, fetchPestTypeById, updatePestTypeById}
 */

// Custom module imports
const { pestTypeService } = require("../services/pest-type-service");

// Create service
const service = pestTypeService();

/**
 * @function createPestType
 * @post /pest-types
 * @description - Creates a new pest type in the database.
 * The request body should contain the necessary details for the pest type.
 * The function saves the pest type to the database and returns a success message.
 * 
 * @param {Object} req - The request object containing the pest type details.
 * @param {Object} res - The response object to send the response back.
 * 
 * @returns {Object} - Returns a JSON response with the created pest type and a success message.
 * @throws {Error} - Throws an error if the save operation fails.
 */
const createPestType = async (req, res) => {
    // Get pest type details from request body
    const { description, name } = req.body;
    let pestTypeDetails = { name };
    // Add optional fields
    if (description) pestTypeDetails.description = description;

    // Try to save details
    try {
        const pestType = await service.save(pestTypeDetails);
        return res.status(201).json({ data: pestType, message: "Pest type created successfully"});
    } catch (error) {
        console.error("Failed to create pest type: ", error.message);
        return res.status(500).json({ message: error.message })
    }
};

/**
 * @function deletePestTypeById
 * @delete /pest-types/:pest_type_id
 *
 * @description Handles the deletion of a pest type by its ID.
 * It checks if the pest type exists in the database and deletes it (soft delete).
 * If the pest type is not found, it returns a 404 status code with an error message.
 *
 * @param {Object} req - The request object containing the pest type ID in the path parameters.
 * @param {string} req.params.pest_type_id - The ID of the pest type to be deleted.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - Returns a response with statusCode as 204 if deletion successful,
 * or an error message with a 500 status code if the deletion fails.
 */
const deletePestTypeById = async (req, res) => {
    // Get ID of pest type from req params
    const pestTypeId = req.params["pest_type_id"];
    if (!pestTypeId) return res.status(400).json({ message: "pest_type_id is required" });

    // Try to delete the pest type
    try {
        const pestType = await service.remove(pestTypeId);
        if (!pestType) return res.status(404).json({ message: "Pest type not found" });
        return res.status(204).send();
    } catch (error) {
        console.error("Failed to delete pest type: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function fetchAllPestTypes
 * @get /pest-types
 *
 * @description Handles the retrieval of all pest types from the database.
 * It fetches all pest types, including inactive ones, and returns them in a JSON response with a success message.
 * If there are no pest types, it returns an empty array.
 * 
 * @param {Object} _req - The request object, not used in this function.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the list of pest types and a success message.
 * If an error occurs, it returns a 500 status code with an error message.
 */
const fetchAllPestTypes = async (_req, res) => {
    try {
        const pestTypes = await service.getAll(true); // Includes inactive types as well
        return res.status(200).json({ data: pestTypes, message: "Fetched all pest types successfully" });
    } catch (error) {
        console.error("Failed to fetch all pest types: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function patchUpdatePestTypeById
 * @patch /pest-types/:pest_type_id
 * @description Handles the patch update of a pest type by its ID.
 * It checks and updates the details of the pest type in the database and returns its details.
 * If the pest type is not found, it returns a 404 status code with an error message.
 * It only updates the description field if provided in the request body.
 * 
 * @param {Object} req - The request object containing the pest type ID in the path parameters and the pest type details in the body.
 * @param {string} req.params.pest_type_id - The ID of the pest type to be updated.
 * @param {Object} res - The response object used to send the response back to the client.
 * @return {Object} - Returns a JSON response with the updated pest type details and a success message if successful,
 * or null if no pest type found for the given ID or an error message with a 500 status code if the updation fails.
 */
const patchUpdatePestTypeById = async (req, res) => {
    // Props that can be updated
    const patchUpdateFields = ["description"];

    // Get ID of pest type from req params
    const pestTypeId = req.params["pest_type_id"];
    if (!pestTypeId) return res.status(400).json({ message: "pest_type_id is required" });

    // Get body params from req body
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Required body" });
    const bodyParams = Object.keys(body);
    if (!bodyParams.length || !bodyParams.some(param => patchUpdateFields.includes(param))) return res.status(400).json({ messsage: "No details to update" });

    // Destructure to get fields to be updated
    const { description } = body;
    
    // Add provided field values for update (if any)
    let pestTypeDetails = {};
    if (description) pestTypeDetails.description = description;

    // Try to update details
    try {
        const pestType = await service.update(pestTypeId, pestTypeDetails);
        if (!pestType) res.status(404).json({ data: null, message: "Pest type not found" });
        return res.status(200).json({ data: pestType, message: "Updated pest type details successfully" });
    } catch (error) {
        console.error("Failed to patch update pest type details: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @function pestTypeController
 * @description PestType controller instance for the Ecospace backend.
 * It contains functions for creating a new pest type, deleting a pest type by its ID,
 * fetching all pest types from the database, and patch updating a pest type by its ID.
 * 
 * @returns {Object} - Returns an object with the pest type controller functions.
 */
const pestTypeController = () => {
    return {
        create: createPestType,
        delete: deletePestTypeById,
        fetchAll: fetchAllPestTypes,
        patchUpdate: patchUpdatePestTypeById,
    };
};

// Export controller to use in routes
module.exports = { pestTypeController };
