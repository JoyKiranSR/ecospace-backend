// src.api/middlewares/disease-middleware.js

/**
 * @module disease-middleware
 * Ecospace Disease Middleware
 * 
 * @description This module defines middleware for validating and sanitizing requests related to disease endpoints in the Ecospace backend.
 * It includes validation for creating a disease, fetching a disease by its ID, and updating a disease.
 * 
 * @requires express-validator
 * @exports { diseaseValidator }
 */

// Custom module imports
const { body, param } = require("express-validator");

const createDiseaseValidator = [
    /**
     * Validations: Required fields
     * control_methods: string
     * damage_symptoms: string
     * name: string
     * pathogen_type_id: uuid
     * seasonality: string
     * 
     * Validations: Optional fields
     * description: string
     * life_cycle: string
     * spread_method: string
     */

    // Required fields
    body("control_methods")
        .trim()
        .notEmpty().withMessage("control_methods is required").bail()
        .isString().withMessage("control_methods must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long"),

    body("damage_symptoms")
        .trim()
        .notEmpty().withMessage("damage_symptoms is required").bail()
        .isString().withMessage("damage_symptoms must be a string").bail()
        .trim().toLowerCase()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long"),
    
    body("name")
        .trim()
        .notEmpty().withMessage("name is required").bail()
        .isString().withMessage("name must be a string").bail()
        .isLength({ max: 30 }).withMessage("name must be at most 30 characters long"),
    
    body("pathogen_type_id")
        .trim()
        .notEmpty().withMessage("pathogen_type_id is required").bail()
        .isUUID(4).withMessage("pathogen_type_id must be a valid UUID v4"),
    
    body("seasonality")
        .trim()
        .notEmpty().withMessage("seasonality is required").bail()
        .isString().withMessage("seasonality must be a string")
        .isLength({ max: 100 }).withMessage("seasonality must be at most 100 characters long"),
    
    // Optional fields
    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string"),
    
    body("life_cycle")
        .optional()
        .trim()
        .isString().withMessage("life_cycle must be a string")
        .isLength({ max: 500 }).withMessage("life_cycle must be at most 500 characters long"),
    
    body("spread_method")
        .optional()
        .trim()
        .isString().withMessage("spread_method must be a string")
        .isLength({ max: 500 }).withMessage("spread_method must be at most 500 characters long"),
];

const idValidator = [
    param("disease_id")
        .trim()
        .notEmpty().withMessage("disease_id is required").bail()
        .isUUID(4).withMessage("disease_id must be a valid UUID v4"),
    ];

const updateDiseaseValidator = [
    // Optional fields
    body("control_methods")
        .optional()
        .trim()
        .isString().withMessage("control_methods must be a string")
        .trim().toLowerCase()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long"),

    body("damage_symptoms")
        .optional()
        .trim()
        .isString().withMessage("damage_symptoms must be a string")
        .trim().toLowerCase()
        .isLength({ max: 500 }).withMessage("damage_symptoms must be at most 500 characters long"),
    
    body("name")
        .optional()
        .trim()
        .isString().withMessage("name must be a string")
        .isLength({ max: 30 }).withMessage("name must be at most 30 characters long"),
    
    body("pathogen_type_id")
        .optional()
        .trim()
        .isUUID(4).withMessage("pathogen_type_id must be a valid UUID v4"),
    
    body("seasonality")
        .optional()
        .trim()
        .isString().withMessage("seasonality must be a string")
        .isLength({ max: 100 }).withMessage("seasonality must be at most 100 characters long"),
    
    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string"),
    
    body("life_cycle")
        .optional()
        .trim()
        .isString().withMessage("life_cycle must be a string")
        .isLength({ max: 500 }).withMessage("life_cycle must be at most 500 characters long"),
    
    body("spread_method")
        .optional()
        .trim()
        .isString().withMessage("spread_method must be a string")
        .isLength({ max: 500 }).withMessage("spread_method must be at most 500 characters long"),
];


/**
 * Returns an object containing functions for getting validators for creating, updating,
 * and validating disease IDs.
 * 
 * @returns {Object} An object with the following properties:
 * - create: A function that returns the validator for creating a disease.
 * - id: A function that returns the validator for a disease ID.
 * - update: A function that returns the validator for updating a disease.
 */
const diseaseValidator = () => {
    return  {
        /**
         * @function create
         * @description Middleware function to validate disease creation in the Ecospace backend.
         * It returns the createDiseaseValidator function.
         *
         * @returns {ValidationChain[]}
         */
        create: () => createDiseaseValidator,

        /**
         * @function id
         * @description Middleware function to validate disease ID in the Ecospace backend.
         * It returns the idValidator function.
         *
         * @returns {ValidationChain[]}
         */
        id: () => idValidator,

        /**
         * @function update
         * @description Middleware function to validate disease update in the Ecospace backend.
         * It returns the updateDiseaseValidator function.
         *
         * @returns {ValidationChain[]}
         */
        update: () => updateDiseaseValidator
    };
};

// Export the diseaseValidator function for use in other modules
module.exports = { diseaseValidator };
