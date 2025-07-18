// src/api/middlewares/plant-middleware.js

/**
 * @module plant-middleware
 * Ecospace Plant Middleware
 *
 * @description This module defines middleware for validating and sanitizing requests related to plant endpoints in the Ecospace backend.
 * It includes validation for creating a plant and fetching a plant by its ID.
 *
 * @requires express-validator
 * @exports plantValidator
 */

// Core module imports
const { body, matchedData, param, validationResult } = require("express-validator");

/**
 * @function validateNonEmptyStringArray
 *
 * @description Validates that a field is an array of non-empty strings.
 *
 * @param {string} field - The name of the field to validate.
 * @returns {ValidationChain} - The validation chain for the field.
 */
const validateNonEmptyStringArray = field =>
  body(field)
    .optional()
    .isArray({ min: 1 }).withMessage(`${field} must be a non-empty array`)
    .customSanitizer(arr =>
      arr.filter(item => typeof item === "string" && item.trim() !== "")
    )
    .custom(arr => arr.length > 0)
    .withMessage(`${field} must have at least one non-empty string`);

/**
 * @constant createPlantValidator
 *
 * @description Validation rules for creating a plant.
 * It checks for required fields like category, growth_cycle, growth_habit, ideal_season, name, and purpose.
 * It also validates optional fields like common_names, common_pests, compatible_plants, recommended_fertilizers,
 * region_compatibility, scientific_name, and tags.
 *
 * @type {ValidationChain[]}
 */
const createPlantValidator = [
    /**
     * Validations: Required values
     * category: string
     * growth_cycle: string
     * growth_habit: string
     * ideal_season: string
     * name: string
     * purpose: string
     * 
     * Allowed values:
     * category: plant/crop
     * growth_cycle: annual/biennial/perennial
     * growth_habit: climber/creeper/herb/herbaceous/grass/shrub/tree
     * ideal_season: autumn/monsoon/spring/summer/winter
     * name: string
     * purpose: flower/fodder/fruit/herb/medicine/spice/vegetable
     */
    body("category")
      .isIn(["plant", "crop"]).withMessage("category must be plant or crop"),
  
    body("growth_cycle")
      .isIn(["annual", "biennial", "perennial"]).withMessage(`growth_cycle must be one of ['annual', 'biennial', 'perennial']`),
  
    body("growth_habit")
      .isIn(["climber", "creeper", "herb", "herbaceous", "grass", "shrub", "tree"])
      .withMessage(`growth_habit must of one of ['climber', 'creeper', 'herb', 'herbaceous', 'grass', 'shrub', 'tree']`),
  
    body("ideal_season")
      .isIn(["autumn", "monsoon", "spring", "summer", "winter"])
      .withMessage(`ideal_season must be one of ['autumn', 'monsoon', 'spring', 'summer', 'winter']`),
  
    body("name")
      .isString().withMessage("name must be a string")
      .notEmpty().withMessage("name is required"),
  
    body("purpose")
      .isIn(["flower", "fodder", "fruit", "herb", "medicine", "spice", "vegetable"])
      .withMessage(`purpose must be one of ['flower', 'fodder', 'fruit', 'herb', 'medicine', 'spice', 'vegetable']`),

    /**
     * validations: Optional values
     *
     * common_names: Array of strings
     * common_pests: Array of strings
     * compatible_plants: Array of strings
     * growth_stages: Array of strings
     * recommended_fertilizers: Array of strings
     * region_compatibility: Array of strings
     * scientific_name: string
     * tags: Array of strings
     */
    validateNonEmptyStringArray("common_names"),
    validateNonEmptyStringArray("common_pests"),
    validateNonEmptyStringArray("compatible_plants"),
    validateNonEmptyStringArray("growth_stages"),
    validateNonEmptyStringArray("recommended_fertilizers"),
    validateNonEmptyStringArray("region_compatibility"),
    validateNonEmptyStringArray("tags"),

    body("scientific_name")
      .optional()
      .isString().withMessage("scientific_name must be a string")
      .notEmpty().withMessage("scientific_name cannot be empty")
      .trim()
];

/**
 * @constant idValidator
 * 
 * @description Validation rules for plant ID.
 * It checks that the plantId is a required path parameter, is an integer, and is greater than 0.
 * 
 * @type {ValidationChain[]}
 */
const idValidator = [
    /**
     * Validations: Required path parameter
     * 
     * plantId: integer
     */
    param("plantId")
      .exists().withMessage("plantId is required")
      .isInt({ min: 1 }).withMessage("plantId must be a positive integer")
      .toInt()
];

/**
 * @function plantValidator
 * 
 * @description Factory function that returns an object containing validation methods for creating a plant,
 * error handling middleware, and validation for plant ID.
 * 
 * @returns {Object} - An object containing the validation methods and error handler.
 * 
 * Note: This function is implemented using closure to encapsulate the validation logic and provide a clean interface for the routes.
 */
const plantValidator = () => {
    return {
        /**
         * @function create
         *
         * @description Method to validate the request body for creating a plant.
         * It uses the createPlantValidator defined above to ensure all required fields are present and valid.
         *
         * @returns {ValidationChain[]} - An array of validation chains for creating a plant.
         */
        create: () => createPlantValidator,
        /**
         * @function errorHandler
         * 
         * @description Middleware function to handle validation errors in the request.
         * It checks for validation errors and sanitizes the request query parameters.
         * If there are validation errors, it returns a 400 status with an error message.
         * 
         * @param {Object} req - The request object containing the query parameters.
         * @param {Object} res - The response object used to send the response back to the client.
         * @param {Function} next - The next middleware function to call if validation passes.
         * @return {void} - Calls next() if validation passes, or returns a 400 status with an error message if validation fails.
         */
        errorHandler: (req, res, next) => {
            const result = validationResult(req)
            const errors = result.array().map(({ msg, path }) => ({ field: path, message: msg }));
            if (!result.isEmpty()) return res.status(400).json({ message: "Validation error", errors });
            // Add sanitized query parameters to request object
            req.sanitizedQuery = matchedData(req, { locations: ["query"] });
            next();
        },
        /**
         * @function id
         * 
         * @description Method to validate the plant ID from the request parameters.
         * It uses the idValidator defined above to ensure the ID is a valid integer.
         * 
         * @returns {ValidationChain[]} - An array of validation chains for the plant ID.
         */
        id: () => idValidator,
    };
};

// Export the plantValidator function for use in other modules
module.exports = { plantValidator };
