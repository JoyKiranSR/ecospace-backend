// src/api/middlewares/pathogen-type-middleware.js

const { body, param, ValidationChain } = require("express-validator");
const { toArrayOfVals } = require("../../utils/common");
const { PATHOGEN_TYPE } = require("../../constants/disease-constant");

/**
 * @module pathogen-type-middleware
 * Ecospace Pathogen Type Middleware
 *
 * @description This module defines middleware functions for pathogen type-related endpoints in the Ecospace backend.
 * It includes functions to handle pathogen type creation, pathogen type update, and pathogen type deletion.
 *
 * @requires pathogen-type-service
 * @exports { pathogenTypevalidator }
 */

/**
 * @function pathogenTypevalidator
 * @description Middleware function to validate pathogen type-related endpoints in the Ecospace backend.
 * It includes validators for pathogen type creation, pathogen type update, and pathogen type deletion.
 * 
 * @returns {ValidationChain[]}
 */
const createPathogenTypeValidator = [
    /**
     * Validation: Required fields
     * - name: string
     * 
     * Optional fields
     * - description: string
     */
    body("name")
        .trim()
        .notEmpty().withMessage("name is required").bail()
        .isString().withMessage("name must be a string").bail()
        .isIn(toArrayOfVals(PATHOGEN_TYPE)).withMessage(`name must be one of ${toArrayOfVals(PATHOGEN_TYPE, true)}`),

    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string")
];

/**
 * @function idValidator
 * @description Middleware function to validate pathogen type ID in the Ecospace backend.
 * It includes a validator for pathogen type ID.
 * 
 * @returns {ValidationChain[]}
 */
const idValidator = [
    /**
     * Validation: Required fields
     * - pathogen_type_id: uuid
     */
    param("pathogen_type_id")
        .trim()
        .notEmpty().withMessage("pathogen_type_id is required").bail()
        .isUUID().withMessage("pathogen_type_id must be a valid UUID")
];

/**
 * @function updatePathogenTypeValidator
 * @description Middleware function to validate pathogen type update in the Ecospace backend.
 * It includes validators for optional fields of pathogen type update.
 * 
 * @returns {ValidationChain[]}
 */
const updatePathogenTypeValidator = [
    /**
     * Validation: 
     * Optional fields
     * - name: string
     * - description: string
     */
    body("name")
        .optional()
        .trim()
        .notEmpty().withMessage("name is required").bail()
        .isString().withMessage("name must be a string").bail()
        .isIn(toArrayOfVals(PATHOGEN_TYPE)).withMessage(`name must be one of ${toArrayOfVals(PATHOGEN_TYPE, true)}`),
    
    body("description")
        .optional()
        .trim()
        .isString().withMessage("description must be a string")
];

/**
 * @function pathogenTypevalidator
 * @description Factory function to retrieve the validation middleware functions for pathogen type-related endpoints.
 * It returns an object with functions to validate pathogen type creation, pathogen type ID, and pathogen type update.
 * 
 * @returns {Object}
 * @property {Function} create - Returns the createPathogenTypeValidator function.
 * @property {Function} id - Returns the idValidator function.
 * @property {Function} update - Returns the updatePathogenTypeValidator function.
 */
const pathogenTypevalidator = () => {
    return {
        /**
         * @function create
         * @description Middleware function to validate pathogen type creation in the Ecospace backend.
         * It returns the createPathogenTypeValidator function.
         *
         * @returns {ValidationChain[]}
         */
        create: () => createPathogenTypeValidator,

        /**
         * @function id
         * @description Middleware function to validate pathogen type ID in the Ecospace backend.
         * It returns the idValidator function.
         *
         * @returns {ValidationChain[]}
         */
        id: () => idValidator,

        /**
         * @function update
         * @description Middleware function to validate pathogen type update in the Ecospace backend.
         * It returns the updatePathogenTypeValidator function.
         *
         * @returns {ValidationChain[]}
         */
        update: () => updatePathogenTypeValidator
    }
};

// Export the middleware functions
module.exports = { pathogenTypevalidator };
