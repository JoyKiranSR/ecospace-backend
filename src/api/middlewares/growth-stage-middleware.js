// src/api/middlewares/growth-stage-middleware.js

/**
 * @module growth-stage-middleware
 * Ecospace Growth Stage Middleware
 * 
 * @description This module defines middleware for handling growth-stage-related requests in the Ecospace backend.
 * It includes validation for growth stage creation requests and checks for required fields.
 * This middleware is used to ensure that the requests to growth stage-related endpoints are properly formatted
 * and contain all necessary information before processing.
 * 
 * @requires express-validator
 * @exports { growthStageValidator }
 */

// Core module imports
const { body, param  } = require("express-validator");
const { PLANT_GROWTH_STAGE } = require("../../constants/plant-constant");
const { toArrayOfVals } = require("../../utils/common");

/**
 * @function createGrowthStageValidator
 * 
 * @description Returns the validation middleware for creating growth stage.
 * This middleware checks that the request body contains all required fields for creating a growth stage entry,
 * and that the values are of the correct type and within the allowed values.
 * 
 * @type {ValidationChain[]}
 */
let createGrowthStageValidator = [
    /**
     * Validations: Required fields
     * name: string
     * order: number
     * 
     * Validations: Optional fields
     * description: string
     * max_days: number
     * min_days: number
     * 
     * Allowed values for fields:
     * name: SOIL_DRAINAGE
     */

    // Required fields
    body("name")
        .isString().withMessage("name must be a string").bail()
        .trim().toLowerCase()
        .isIn(toArrayOfVals(PLANT_GROWTH_STAGE)).withMessage(`growth stage must be one of ${toArrayOfVals(PLANT_GROWTH_STAGE, true)}`),

    body("order")
        .trim()
        .isInt({ min: 1 }).withMessage("order must be a natural number").bail()
        .toInt(),
];

/**
 * @constant idValidator
 * 
 * @description Validation rules for growth stage ID.
 * It checks that the growth_stage_id is a required path parameter and is a valid UUID v4.
 * 
 * @type {ValidationChain[]}
 */
const idValidator = [
    /**
     * Validations: Required path parameter
     * 
     * growth_stage_id: string (UUID)
     */
    param("growth_stage_id")
        .exists().withMessage("growth_stage_id is required").bail()
        .isUUID(4).withMessage("growth_stage_id must be a valid UUID v4")
        .trim()
];

const updateGrowthStageValidator = [
    /**
     * Validations: fields
     * description: string
     * max_days: number
     * min_days: number
     */

    body("description")
        .optional()
        .trim()
        .notEmpty().withMessage("description is required").bail()
        .isString().withMessage("description must be a string"),

    body("max_days")
        .optional()
        .trim()
        .isInt({ min: 1 }).withMessage("max_days must be a natural number").bail()
        .custom((value, { req }) => {
            if (req.body.min_days && value <= req.body.min_days) {
                throw new Error("max_days must be greater than min_days");
            }
            return true;
            })
        .toInt(),

    body("min_days")
        .optional()
        .trim()
        .isInt({ min: 0 }).withMessage("min_days must be a whole number").bail()
        .custom((value, { req }) => {
            if (req.body.max_days && value >= req.body.max_days) {
                throw new Error("min_days must be lesser than max_days");
            }
            return true;
            })
        .toInt(),
];

// Add optional fields to create validator
createGrowthStageValidator = [ ...createGrowthStageValidator, ...updateGrowthStageValidator ]; // this adds optional fields

const growthStageValidator = () => {
    return {
        /**
         * @function create
         *
         * @description Returns the validation middleware for creating growth stage.
         * This middleware checks that the request body contains all required fields for creating a growth stage entry,
         * and that the values are of the correct type and within the allowed values.
         * 
         * @returns {ValidationChain[]} - An array of validation chains for creating growth stage.
         */
        create: () => createGrowthStageValidator,
    
         /**
         * @function id
         * 
         * @description Method to validate the growth stage ID from the request parameters.
         * It uses the idValidator defined above to ensure the ID is a valid integer.
         * 
         * @returns {ValidationChain[]} - An array of validation chains for the growth stage ID.
         */
        id: () => idValidator,

        update: () => updateGrowthStageValidator,
    }
};

module.exports = { growthStageValidator };
