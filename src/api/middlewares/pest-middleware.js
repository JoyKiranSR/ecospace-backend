// src/api/middlewares/pest-middleware.js

/**
 * @module pest-middleware
 * Ecospace Pest Middleware
 * 
 * @description This module defines middleware functions for validating pest-related requests in the Ecospace backend.
 * It includes validators for creating, updating, and deleting pests, as well as validators for fetching pests by ID and fetching all pests.
 * 
 * @requires express-validator
 * @exports {validatePest}
 */

// Core module imports
const { body, param } = require("express-validator");

/**
 * @function validatePest
 * 
 * @description Returns the validation middleware for creating a pest.
 * This middleware checks that the request body contains all required fields for creating a pest entry,
 * and that the values are of the correct type and within the allowed values.
 * 
 * @type {ValidationChain[]}
 */
const createPestValidator = [
    /**
     * Required fields:
     *
     * control_methods: string
     * damage_symptoms: string
     * name: string
     * pest_type_id: uuid
     * seasonality: string
     * 
     * Optional fields:
     * description: string
     * life_cycle: string
     * scientific_name: string
     */
    body("control_methods")
        .trim()
        .notEmpty().withMessage("control_methods are required").bail()
        .isString().withMessage("control_methods must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("control_methods must be at most 500 characters long").trim(),

    body("damage_symptoms")
        .trim()
        .notEmpty().withMessage("damage_symptoms are required").bail()
        .isString().withMessage("damage_symptoms must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long").trim(),

    body("name")
        .trim()
        .notEmpty().withMessage("name is required").bail()
        .isString().withMessage("name must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 20 }).withMessage("name must be at most 20 characters long").trim(),

    body("pest_type_id")
        .trim()
        .notEmpty().withMessage("pest_type_id is required").bail()
        .isUUID().withMessage("pest_type_id must be a valid UUID").trim(),

    body("seasonality")
        .trim()
        .notEmpty().withMessage("seasonality is required").bail()
        .isString().withMessage("seasonality must be a string").trim().bail()
        .isLength({ max: 100 }).withMessage("seasonality must be at most 100 characters long").trim(),

    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string").trim(),

    body("life_cycle")
        .optional()
        .trim()
        .isString().withMessage("life_cycle must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("life_cycle must be at most 500 characters long").trim(),

    body("scientific_name")
        .optional()
        .trim()
        .isString().withMessage("scientific_name must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 50 }).withMessage("scientific_name must be at most 50 characters long").trim(),            
];

/**
 * @function validatePest
 * 
 * @description Returns the validation middleware for fetching a pest by ID.
 * This middleware checks that the request parameters contain a valid UUID for the pest ID.
 * 
 * @type {ValidationChain[]}
 */
const idValidator = [
    param("pest_id")
        .trim()
        .notEmpty().withMessage("pest_id is required").bail()
        .isUUID().withMessage("pest_id must be a valid UUID").trim()
];

/**
 * @function validatePest
 * 
 * @description Returns the validation middleware for updating a pest.
 * This middleware checks that the request body contains all optional fields for updating a pest entry,
 * and that the values are of the correct type and within the allowed values.
 * 
 * @type {ValidationChain[]}
 */
const updatePestValidator = [
    /**
     * Optional fields:
     * control_methods: string
     * damage_symptoms: string
     * name: string
     * pest_type_id: uuid
     * seasonality: string
     * description: string
     * life_cycle: string
     * scientific_name: string
     */
    body("control_methods")
        .optional()
        .trim()
        .isString().withMessage("control_methods must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("control_methods must be at most 500 characters long").trim(),

    body("damage_symptoms")
        .optional()
        .trim()
        .isString().withMessage("damage_symptoms must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long").trim(),

    body("name")
        .optional()
        .trim()
        .isString().withMessage("name must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 20 }).withMessage("name must be at most 20 characters long").trim(),

    body("pest_type_id")
        .optional()
        .trim()
        .isUUID().withMessage("pest_type_id must be a valid UUID").trim(),

    body("seasonality")
        .optional()
        .trim()
        .isString().withMessage("seasonality must be a string").trim().bail()
        .isLength({ max: 100 }).withMessage("seasonality must be at most 100 characters long").trim(),

    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string").trim(),

    body("life_cycle")
        .optional()
        .trim()
        .isString().withMessage("life_cycle must be a string").trim().bail()
        .isLength({ max: 500 }).withMessage("life_cycle must be at most 500 characters long").trim(),

    body("scientific_name")
        .optional()
        .trim()
        .isString().withMessage("scientific_name must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 50 }).withMessage("scientific_name must be at most 50 characters long").trim(),            
];

/**
 * @function pestValidator
 * 
 * @description Returns an object containing validation middleware functions for pest-related operations.
 * These middleware functions validate requests for creating, updating, and deleting pests, as well as fetching pests by ID.
 * Each validator ensures that the request data is properly formatted and meets the required criteria.
 * 
 * @returns {Object} An object with the following validator functions:
 * - createOne: Validates the creation of a pest.
 * - id: Validates the pest ID.
 * - patchOne: Validates the update of pest details.
 * - deleteOne: Validates the deletion of a pest.
 */
const pestValidator = () => {
    return {
        /**
         * @function create
         * 
         * @description Returns the validation middleware for creating a pest.
         * This middleware checks that the request body contains all required fields for creating a pest entry,
         * and that the values are of the correct type and within the allowed values.
         * 
         * @type {ValidationChain[]}
         */
        create: () => createPestValidator,

        /**
         * @function id
         * 
         * @description Returns the validation middleware for fetching a pest by ID.
         * This middleware checks that the request parameters contain a valid UUID for the pest ID.
         * 
         * @type {ValidationChain[]}
         */
        id: () => idValidator,

        /**
         * @function patchOne
         * 
         * @description Returns the validation middleware for updating a pest.
         * This middleware checks that the request body contains all optional fields for updating a pest entry,
         * and that the values are of the correct type and within the allowed values.
         * 
         * @type {ValidationChain[]}
         */
        patchOne: () => updatePestValidator,
    };
};

// Export the validators for use in the main application
module.exports = { pestValidator };
