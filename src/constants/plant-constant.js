// src/constants/plant-constant.js

/**
 * @module plant-constant
 * Ecospace Plant Constants
 *
 * @description This module defines constants related to plants in the Ecospace backend.
 * It includes categories, purposes, growth habits, growth cycles, and growth stages for plants.
 * These constants are used to standardize the classification and characteristics of plants
 * within the Ecospace application.
 * 
 * @requires none
 * @exports {PLANT_CATEGORY, PLANT_PURPOSE, PLANT_GROWTH_HABIT, PLANT_GROWTH_CYCLE, PLANT_GROWTH_STAGE}
 */

/**
 * @constant PLANT_CATEGORY
 * 
 * @description Defines the categories of plants.
 * It includes two categories: "crop" and "plant".
 * This categorization helps in distinguishing between different types of plants based on their primary use or characteristics.
 * It is useful for agriculture, gardening, and ecological studies.
 * This constant is used to classify plants into specific categories, which can influence their care, cultivation, and market value.
 *
 * @type {Object}
 * @property {string} CROP - Represents a crop plant.
 * @property {string} PLANT - Represents a general plant.
 */
const PLANT_CATEGORY = Object.freeze({
    CROP: "crop",
    PLANT: "plant",
});

/**
 * @constant PLANT_PURPOSE
 * 
 * @description Defines the purposes of plants.
 * It includes various purposes such as flower, fodder, fruit, herb, medicine, spice, and vegetable.
 * This categorization helps in understanding the primary use of different plants.
 * It is useful for agriculture, gardening, and culinary applications.
 * This constant is used to classify plants based on their intended use, which can influence their cultivation, care, and market value.
 *
 * @type {Object}
 * @property {string} FLOWER - Represents a plant grown for its flowers.
 * @property {string} FODDER - Represents a plant grown for animal feed.
 * @property {string} FRUIT - Represents a plant grown for its fruits.
 * @property {string} HERB - Represents a plant grown for culinary or medicinal herbs.
 * @property {string} MEDICINE - Represents a plant grown for medicinal purposes.
 * @property {string} SPICE - Represents a plant grown for spices.
 * @property {string} VEGETABLE - Represents a plant grown for vegetables.
 */
const PLANT_PURPOSE = Object.freeze({
    FLOWER: "flower",
    FODDER: "fodder",
    FRUIT: "fruit",
    HERB: "herb",
    MEDICINE: "medicine",
    SPICE: "spice",
    VEGETABLE: "vegetable",
});

/**
 * @constant PLANT_GROWTH_HABIT
 *
 * @description Defines the growth habits of plants.
 * It includes various growth habits such as climber, creeper, herb, herbaceous, grass, shrub, and tree.
 * This categorization helps in understanding the physical characteristics and growth patterns of different plants.
 * It is useful for gardening, agriculture, and ecological studies.
 * This constant is used to classify plants based on their growth forms, which can influence their care, cultivation, and ecological roles.
 *
 * @type {Object}
 * @property {string} CLIMBER - Represents a climbing plant.
 * @property {string} CREEPER - Represents a creeping plant.
 * @property {string} HERB - Represents a herbaceous plant.
 * @property {string} HERBACEOUS - Represents a herbaceous plant.
 * @property {string} GRASS - Represents a grass plant.
 * @property {string} SHRUB - Represents a shrub plant.
 * @property {string} TREE - Represents a tree plant.
 */
const PLANT_GROWTH_HABIT = Object.freeze({
    CLIMBER: "climber",
    CREEPER: "creeper",
    HERB: "herb",
    HERBACEOUS: "herbaceous",
    GRASS: "grass",
    SHRUB: "shrub",
    TREE: "tree",
});

/**
 * @constant PLANT_GROWTH_CYCLE
 *
 * @description Defines the growth cycles of plants.
 * It includes three growth cycles: annual, biennial, and perennial.
 * This categorization helps in understanding the life cycle and longevity of different plants.
 * It is useful for gardening, agriculture, and ecological studies.
 * This constant is used to classify plants based on their growth duration and lifecycle, which can influence their care, cultivation, and ecological roles.
 *
 * @type {Object}
 * @property {string} ANNUAL - Represents a plant that completes its life cycle in one year.
 * @property {string} BIENNIAL - Represents a plant that completes its life cycle in two years.
 * @property {string} PERENNIAL - Represents a plant that lives for more than two years.
 */
const PLANT_GROWTH_CYCLE = Object.freeze({
    ANNUAL: "annual",
    BIENNIAL: "biennial",
    PERENNIAL: "perennial",
});

/**
 * @constant PLANT_GROWTH_STAGE
 *
 * @description Defines the growth stages of plants.
 * It includes various stages such as budding, flowering, fruiting, germination, harvesting, seedling, and vegetative.
 * This categorization helps in understanding the developmental phases of different plants.
 * It is useful for gardening, agriculture, and ecological studies.
 * This constant is used to classify plants based on their growth stages, which can influence their care, cultivation, and harvest timing.
 *
 * @type {Object}
 * @property {string} BUDDING - Represents the budding stage of a plant.
 * @property {string} FLOWERING - Represents the flowering stage of a plant.
 * @property {string} FRUITING - Represents the fruiting stage of a plant.
 * @property {string} GERMINATION - Represents the germination stage of a plant.
 * @property {string} HARVESTING - Represents the harvesting stage of a plant.
 * @property {string} SEEDLING - Represents the seedling stage of a plant.
 * @property {string} VEGETATIVE - Represents the vegetative stage of a plant.
 */
const PLANT_GROWTH_STAGE = Object.freeze({
    BUDDING: "budding",
    FLOWERING: "flowering",
    FRUITING: "fruiting",
    GERMINATION: "germination",
    HARVESTING: "harvesting",
    SEEDLING: "seedling",
    VEGETATIVE: 'vegetative',
});

// Exporting the constants for use in other modules
module.exports = {
    PLANT_CATEGORY,
    PLANT_GROWTH_CYCLE,
    PLANT_GROWTH_HABIT,
    PLANT_GROWTH_STAGE,
    PLANT_PURPOSE,
};
