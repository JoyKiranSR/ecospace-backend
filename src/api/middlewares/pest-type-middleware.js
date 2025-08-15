// src/api/middlewares/pest-type-middleware.js

// Core module imports
const { body, param } = require("express-validator");

// Custom module imports
const { toArrayOfVals } = require("../../utils/common");
const { PEST_TYPE } = require("../../constants/pest-constant");

let createPestTypeValidator = [
    // Required field(s)
    body("name")
        .notEmpty().withMessage("name is a required field").bail()
        .isString().withMessage("name must be a string").bail()
        .trim().toLowerCase()
        .isIn(toArrayOfVals(PEST_TYPE)).withMessage(`name must be one of ${toArrayOfVals(PEST_TYPE, true)}`)
];

const idValidator = [
    param("pest_type_id")
        .trim()
        .notEmpty().withMessage("pest_type_id is required as path param").bail()
        .isUUID().withMessage("pest_type_id should be a valid UUID")
];

const updatePestTypeDetailsValidator = [
    body("description")
        .optional()
        .isString().withMessage("description must be a string").bail()
        .trim()
];

createPestTypeValidator = [ ...createPestTypeValidator, ...updatePestTypeDetailsValidator ];

const pestTypeValidator = () => {
    return {
        create: createPestTypeValidator,
        id: idValidator,
        patchOne: updatePestTypeDetailsValidator, 
    };
};

// Export validators as a middleware function
module.exports = { pestTypeValidator };
