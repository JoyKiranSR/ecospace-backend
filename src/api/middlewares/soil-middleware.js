// src/api/middlewares/soil-middleware.js

const { body } = require("express-validator");
const { SOIL_DRAINAGE, SOIL_NUTRIENT_LEVEL, SOIL_ORGANIC_MATTER_LEVEL, SOIL_TEXTURE,
  SOIL_TYPE, SOIL_WATER_RETENTION_LEVEL} = require("../../constants/soil-constant");
const { toArrayOfVals } = require("../../utils/common");

/**
 * @module soil-middleware
 * Ecospace Soil Middleware
 * 
 * @description This module defines middleware for handling soil-related requests in the Ecospace backend.
 * It includes validation for soil creation requests and checks for required fields.
 * This middleware is used to ensure that the requests to soil-related endpoints are properly formatted
 * and contain all necessary information before processing.
 * 
 * @requires express-validator
 * @exports {soilValidator}
 */

/**
 * @function createSoilValidator
 * 
 * @description Returns the validation middleware for creating soil.
 * This middleware checks that the request body contains all required fields for creating a soil entry,
 * and that the values are of the correct type and within the allowed values.
 * 
 * @type {ValidationChain[]}
 */
const createSoilValidator = [
  /**
   * Validations: Required fields
   * drainage: string
   * name: string
   * nutrient_level: string
   * organic_matter_level: string
   * texture: string
   * type: string
   * texture: string
   * water_retention_level: string
   * 
   * Validations: Optional fields
   * color: string
   * description: string
   * ph_min: number
   * ph_max: number
   * 
   * Allowed values for fields:
   * drainage: SOIL_DRAINAGE
   * nutrient_level: SOIL_NUTRIENT_LEVEL
   * organic_matter_level: SOIL_ORGANIC_MATTER_LEVEL
   * texture: SOIL_TEXTURE
   * type: SOIL_TYPE
   * water_retention_level: SOIL_WATER_RETENTION_LEVEL
   */

  // Required fields
  body("drainage")
    .trim()
    .notEmpty().withMessage("drainage is required").bail()
    .isString().withMessage("drainage must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_DRAINAGE)).withMessage(`drainage must be one of ${toArrayOfVals(SOIL_DRAINAGE, true)}`),

  body("name")
    .trim()
    .notEmpty().withMessage("name is required").bail()
    .isString().withMessage("name must be a string")
    .isLength({ max: 20 }).withMessage("name must be at most 20 characters long"),

  body("nutrient_level")
    .trim()
    .notEmpty().withMessage("nutrient_level is required").bail()
    .isString().withMessage("nutrient_level must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_NUTRIENT_LEVEL)).withMessage(`nutrient_level must be one of ${toArrayOfVals(SOIL_NUTRIENT_LEVEL, true)}`),

  body("organic_matter_level")
    .trim()
    .notEmpty().withMessage("organic_matter_level is required").bail()
    .isString().withMessage("organic_matter_level must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_ORGANIC_MATTER_LEVEL)).withMessage(`organic_matter_level must be one of ${toArrayOfVals(SOIL_ORGANIC_MATTER_LEVEL, true)}`),

  body("texture")
    .trim()
    .notEmpty().withMessage("texture is required").bail()
    .isString().withMessage("texture must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_TEXTURE)).withMessage(`texture must be one of ${toArrayOfVals(SOIL_TEXTURE, true)}`),

  body("type")
    .trim()
    .notEmpty().withMessage("type is required").bail()
    .isString().withMessage("type must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_TYPE)).withMessage(`type must be one of ${toArrayOfVals(SOIL_TYPE, true)}`),

  body("water_retention_level")
    .trim()
    .notEmpty().withMessage("water_retention_level is required").bail()
    .isString().withMessage("water_retention_level must be a string").bail()
    .trim().toLowerCase()
    .isIn(toArrayOfVals(SOIL_WATER_RETENTION_LEVEL)).withMessage(`water_retention_level must be one of ${toArrayOfVals(SOIL_WATER_RETENTION_LEVEL, true)}`),

  // Optional fields
  body("color")
    .optional()
    .trim()
    .isString().withMessage("color must be a string")
    .isLength({ max: 10 }).withMessage("color must be at most 10 characters long"),

  body("description")
    .optional()
    .trim()
    .isString().withMessage("description must be a string")
    .isLength({ max: 100 }).withMessage("description must be at most 100 characters long"),

  body("ph_min")
    .optional()
    .trim()
    .isFloat({ min: 0, max: 14 }).withMessage("ph_min must be between 0 and 14").bail()
    .custom((value, { req }) => {
      if (req.body.ph_max && value > req.body.ph_max) {
        throw new Error("ph_min must be less than or equal to ph_max");
      }
      return true;
    })
    .toFloat(),

  body("ph_max")
    .optional()
    .trim()
    .isFloat({ min: 0, max: 14 }).withMessage("ph_max must be between 0 and 14").bail()
    .custom((value, { req }) => {
      if (req.body.ph_min && value < req.body.ph_min) {
        throw new Error("ph_max must be greater than or equal to ph_min");
      }
      return true;
    })
    .toFloat()
];

const soilValidator = () => {
  return {
    /**
     * @function create
     *
     * @description Returns the validation middleware for creating soil.
     * This middleware checks that the request body contains all required fields for creating a soil entry,
     * and that the values are of the correct type and within the allowed values.
     * 
     * @returns {ValidationChain[]} - An array of validation chains for creating soil.
     */
    create: () => createSoilValidator
  }
};

module.exports = { soilValidator };
