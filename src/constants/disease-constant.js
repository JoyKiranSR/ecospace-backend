// src/constants/disease-constant.js

/**
 * @module disease-constant
 * Ecospace Disease Constants
 * 
 * @description This module defines constants related to diseases in the Ecospace backend.
 * 
 * @requires none
 * @exports {PATHOGEN_TYPE}
 */

/**
 * @constant PATHOGEN_TYPE
 * 
 * @description Defines the types of pathogens that can cause diseases.
 * It includes many different types of pathogens, such as bacteria, fungi, insects, viruses, protozoa, etc 
 * This categorization helps in understanding the different types of pathogens that can cause diseases.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify pathogens, which can affect plant health and agricultural practices.
 *
 * @type {Object}
 * @property {string} BACTERIA - Represents bacteria.
 * @property {string} FUNGI - Represents fungi.
 * @property {string} INSECT - Represents insects.
 * @property {string} VIRUS - Represents viruses.
 */
const PATHOGEN_TYPE = Object.freeze({
    BACTERIA: "bacteria",
    FUNGI: "fungi",
    INSECT: "insect",
    NEMATODE: "nematode",
    OOMYCETE: "oomycete",
    PHYTOPLASMA: "phytoplasma",
    PROTOZOA: "protozoa",
    VIRUS: "virus",
});

// Export the PATHOGEN_TYPE constant
export { PATHOGEN_TYPE };
