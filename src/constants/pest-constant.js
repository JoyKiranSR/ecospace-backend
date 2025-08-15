// src/constants/pest-constant.js

/**
 * @module pest-constant
 * Ecospace Pest Constants
 * 
 * @description This module defines constants related to pest in the Ecospace backend.
 * 
 * @requires none
 * @exports {PEST_TYPE}
 */

/**
 * @constant PLANT_GROWTH_STAGE
 *
 * @description Defines the types of pests.
 * It includes various types such as bird, insect, mite, nematode, rodent, slug, snail.
 * This categorization helps in understanding the different types of pests.
 * It is useful for gardening, agriculture, and ecological studies.
 * This constant is used to classify pests based on their type, which can influence growth and yield of the plants.
 *
 * @type {Object}
 * @property {string} BIRD - Represents the pest type as Bird.
 * @property {string} INSECT - Represents the pest type as Insect.
 * @property {string} MITE - Represents the pest type as Mite.
 * @property {string} NEMATODE - Represents the pest type as Nematode.
 * @property {string} RODENT - Represents the pest type as Rodent.
 * @property {string} SLUG - Represents the pest type as Slug.
 * @property {string} SNAIL - Represents the pest type as Snail.
 * 
 */
const PEST_TYPE = Object.freeze({
    BIRD: "bird",
    INSECT: "insect",
    MITE: "mite",
    NEMATODE: "nematode",
    RODENT: "rodent",
    SLUG: "slug",
    SNAIL: "snail",
});

// Exporting the constants for use in other modules
module.exports = { PEST_TYPE };
