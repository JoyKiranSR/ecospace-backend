// src/constants/season-constant.js

/**
 * @module season-constant
 * Ecospace Season Constants
 * 
 * @description This module defines constants related to seasons in the Ecospace backend.
 *
 * @requires none
 * @exports {SEASON}
 */

/**
 * @constant SEASON
 * 
 * @description Defines the seasons of the year.
 * It includes five seasons: autumn, monsoon, spring, summer, and winter.
 * This categorization helps in understanding the seasonal variations in climate and ecology.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify plants and their growth cycles based on the season, which can influence their care, cultivation, and market value.
 * 
 * @type {Object}
 * @property {string} AUTUMN - Represents the autumn season.
 * @property {string} MONSOON - Represents the monsoon season.
 * @property {string} SPRING - Represents the spring season.
 * @property {string} SUMMER - Represents the summer season.
 * @property {string} WINTER - Represents the winter season.
 */
const SEASON = Object.freeze({
    AUTUMN: "autumn",
    MONSOON: "monsoon",
    SPRING: "spring",
    SUMMER: "summer",
    WINTER: "winter"
});

// This module exports the SEASON constant, which can be used in other parts of the application to reference the defined seasons.
module.exports = { SEASON };
