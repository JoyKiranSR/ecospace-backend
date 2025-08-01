// src/constants/soil-constant.js

/**
 * @module soil-constant
 * Ecospace Soil Constants
 * 
 * @description This module defines constants related to soil in the Ecospace backend.
 * 
 * @requires none
 * @exports { SOIL_TEXTURE, SOIL_TYPE }
 */

/**
 * @constant SOIL_TEXTURE
 * 
 * @description Defines the types of soil textures.
 * It includes various soil types such as chalk, clay, loamy, peat, sandy, and silt.
 * This categorization helps in understanding the physical characteristics of soil,
 * which can influence plant growth, water retention, and nutrient availability.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil types, which can affect land management practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} CHALK - Represents chalky soil.
 * @property {string} CLAY - Represents clay soil.
 * @property {string} LOAMY - Represents loamy soil.
 * @property {string} PEAT - Represents peat soil.
 * @property {string} SANDY - Represents sandy soil.
 * @property {string} SILT - Represents silty soil.   
 */
const SOIL_TEXTURE = Object.freeze({
    CHALKY: "chalky", // Alkaline
    CLAYEY: "clayey", // Holds water, heavy
    LOAMY: "loamy", // Balanced, ideal
    PEATY: "peaty", // Organic, high moisture
    SANDY: "sandy", // Drains quickly, low nutrients 
    SILTLY: "siltly", // Smooth, retains moisture
});

/**
 * @constant SOIL_TYPE
 * 
 * @description Defines the types of soil based on their characteristics.
 * It includes various soil types such as alluvial, black, red, laterite, forest, desert, and mountain.
 * This categorization helps in understanding the ecological and agricultural significance of different soil types.
 * It is useful for land management, conservation, and agricultural practices.
 * This constant is used to classify soil types based on their formation and characteristics, which can influence land use planning and environmental conservation.
 *
 * @type {Object}
 * @property {string} ALLUVIAL - Represents alluvial soil.
 * @property {string} BLACK - Represents black soil.
 * @property {string} RED - Represents red soil.
 * @property {string} LATERITE - Represents laterite soil.
 * @property {string} FOREST - Represents forest soil.
 * @property {string} DESERT - Represents desert soil.
 * @property {string} MOUNTAIN - Represents mountain soil.
 */
const SOIL_TYPE = Object.freeze({
    ALLUVIAL: "alluvial", // Deposited by rivers, fertile plains
    BLACK: "black", // Rich in organic matter, fertile, moisture retention
    RED: "red", // Rich in iron, well-drained, acidic, low fertility
    LATERITE: "laterite", // Tropical, high iron and aluminum, poor fertility
    FOREST: "forest", // Rich in organic matter, well-drained, high fertility
    DESERT: "desert", // Sandy, low organic matter, poor fertility
    MOUNTAIN: "mountain", // Rocky, well-drained, low fertility
});

module.exports = { SOIL_TEXTURE, SOIL_TYPE };
