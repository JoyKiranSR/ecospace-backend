// src/api/middlewares/pest-type-middleware.js

const { body } = require("express-validator");
const { toArrayOfVals } = require("../../utils/common");
const { PEST_TYPE } = require("../../constants/pest-constant");

const createPestTypeValidator = [
    // Required field(s)
    body("name")
        .notEmpty().withMessage("name is a required field").bail()
        .isString().withMessage("name must be a string").bail()
        .trim().toLowerCase()
        .isIn(toArrayOfVals(PEST_TYPE)).withMessage(`name must be one of ${toArrayOfVals(PEST_TYPE, true)}`),

    // Optional field(s)
    body("description")
        .optional()
        .isString().withMessage("description must be a string").bail()
        .trim()
];

const pestTypeValidator = () => {
    return {
        create: createPestTypeValidator,
    };
};

// Export validators as a middleware function
module.exports = { pestTypeValidator };
