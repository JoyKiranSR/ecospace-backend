// src/constants/soil-constant.js

/**
 * @module soil-constant
 * Ecospace Soil Constants
 * 
 * @description This module defines constants related to soil in the Ecospace backend.
 * 
 * @requires none
 * @exports {SOIL_DRAINAGE, SOIL_NUTRIENT_LEVEL, SOIL_ORGANIC_MATTER_LEVEL, SOIL_PH_TYPE,
 * SOIL_TEXTURE, SOIL_TYPE, SOIL_WATER_RETENTION_LEVEL}
 */

/**
 * @constant SOIL_DRAINAGE
 *
 * @description Defines the drainage characteristics of soil.
 * It includes various drainage types such as moderately drained, poorly drained, and well-drained.
 * This categorization helps in understanding how water moves through soil, which can influence plant growth and land management practices.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil drainage types, which can affect irrigation practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} MODERATELY_DRAINED - Represents soil that drains water at a moderate rate.
 * @property {string} POORLY_DRAINED - Represents soil that retains water and does not drain well.
 * @property {string} WELL_DRAINED - Represents soil that allows water to pass through easily.
 */
const SOIL_DRAINAGE = Object.freeze({
    MODERATELY_DRAINED: "moderately-drained", // Soil that drains water at a moderate rate
    POORLY_DRAINED: "poorly-drained", // Soil that retains water and does not drain well
    WELL_DRAINED: "well-drained", // Soil that allows water to pass through easily
});

/**
 * @constant SOIL_NUTRIENT_LEVEL
 *
 * @description Defines the nutrient levels of soil.
 * It includes various nutrient levels such as moderate, poor, and rich.
 * This categorization helps in understanding the fertility of soil, which can influence plant growth and agricultural practices.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil nutrient levels, which can affect land management practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} MODERATE - Represents soil with moderate nutrient levels.
 * @property {string} POOR - Represents soil with poor nutrient levels.
 * @property {string} RICH - Represents soil with rich nutrient levels.
 */
const SOIL_NUTRIENT_LEVEL = Object.freeze({
    MODERATE: "moderate", // Soil with moderate nutrient levels
    POOR: "low", // Soil with poor nutrient levels
    RICH: "high", // Soil with rich nutrient levels
});

/**
 * @constant SOIL_ORGANIC_MATTER_LEVEL
 *
 * @description Defines the organic matter levels of soil.
 * It includes various organic matter levels such as high, low, and medium.
 * This categorization helps in understanding the biological activity and fertility of soil, which can influence plant growth and agricultural practices.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil organic matter levels, which can affect land management practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} HIGH - Represents soil with high organic matter level.
 * @property {string} LOW - Represents soil with low organic matter level.
 * @property {string} MEDIUM - Represents soil with medium organic matter level.
 */
const SOIL_ORGANIC_MATTER_LEVEL = Object.freeze({
    HIGH: "high", // Soil with high organic matter level
    LOW: "low", // Soil with low organic matter level
    MEDIUM: "medium", // Soil with medium organic matter level
});

/**
 * @constant SOIL_PH_TYPE
 * 
 * @description Defines the pH levels of soil.
 * It includes various pH levels such as acidic, alkaline, and neutral.
 * This categorization helps in understanding the chemical properties of soil,
 * which can influence nutrient availability and plant growth.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil pH levels, which can affect land management practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} ACIDIC - Represents acidic soil (pH < 7).
 * @property {string} ALKALINE - Represents alkaline soil (pH > 7).
 * @property {string} NEUTRAL - Represents neutral soil (pH = 7).
 */
const SOIL_PH_TYPE = Object.freeze({
    ACIDIC: "acidic", // pH < 7
    ALKALINE: "alkaline", // pH > 7
    NEUTRAL: "neutral", // pH = 7
});

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


/**
 * @constant SOIL_WATER_RETENTION_LEVEL
 *
 * @description Defines the water retention levels of soil.
 * It includes various retention types such as high, low, and moderate.
 * This categorization helps in understanding how much water soil can hold, which can influence irrigation practices and plant growth.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify soil water retention types, which can affect irrigation practices, crop selection, and environmental conservation.
 *
 * @type {Object}
 * @property {string} HIGH - Represents soil that retains a lot of water.
 * @property {string} LOW - Represents soil that retains little water.
 * @property {string} MODERATE - Represents soil that retains a moderate amount of water.
 */
const SOIL_WATER_RETENTION_LEVEL = Object.freeze({
    HIGH: "high", // Soil that retains a lot of water
    LOW: "low", // Soil that retains little water
    MODERATE: "moderate", // Soil that retains a moderate amount of water
});

module.exports = {
    SOIL_DRAINAGE,
    SOIL_NUTRIENT_LEVEL,
    SOIL_ORGANIC_MATTER_LEVEL,
    SOIL_PH_TYPE,
    SOIL_TEXTURE,
    SOIL_TYPE,
    SOIL_WATER_RETENTION_LEVEL
};
