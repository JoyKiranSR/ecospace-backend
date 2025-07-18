// src/constants/soil-constant.js

/**
 * @module soil-constant
 * Ecospace Soil Constants
 * 
 * @description This module defines constants related to soil types in the Ecospace backend.
 * 
 * @requires none
 * @exports {SOIL_TYPE}
 */

/**
 * @constant SOIL_TYPE
 * 
 * @description Defines the types of soil.
 * It includes various soil types such as chalk, clay, loamy, peat, sandy, and silt.
 * This categorization helps in understanding the characteristics and properties of different soil types.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil types, which can influence plant growth, cultivation practices, and land management strategies.
 * 
 * @type {Object}
 * @property {string} CHALK - Represents chalky soil.
 * @property {string} CLAY - Represents clay soil.
 * @property {string} LOAMY - Represents loamy soil.
 * @property {string} PEAT - Represents peat soil.
 * @property {string} SANDY - Represents sandy soil.
 * @property {string} SILT - Represents silty soil.   
 */
const SOIL_TYPE = Object.freeze({
    CHALK: "chalk",
    CLAY: "clay",
    LOAMY: "loamy",
    PEAT: "peat",
    SANDY: "sandy",
    SILT: "silt",
});

// This module exports the SOIL_TYPE constant, which can be used in other parts of the application to reference the defined soil types.
module.exports = { SOIL_TYPE };
