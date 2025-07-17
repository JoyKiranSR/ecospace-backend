const PLANT_CATEGORY = Object.freeze({
    CROP: "crop",
    PLANT: "plant",
});

const PLANT_PURPOSE = Object.freeze({
    FLOWER: "flower",
    FODDER: "fodder",
    FRUIT: "fruit",
    HERB: "herb",
    MEDICINE: "medicine",
    SPICE: "spice",
    VEGETABLE: "vegetable",
});

const PLANT_GROWTH_HABIT = Object.freeze({
    CLIMBER: "climber",
    CREEPER: "creeper",
    HERBACEOUS: "herbaceous",
    GRASS: "grass",
    HERB: "herb",
    SHRUB: "shrub",
    TREE: "tree",
});

const PLANT_GROWTH_CYCLE = Object.freeze({
    ANNUAL: "annual",
    BIENNIAL: "biennial",
    PERENNIAL: "perennial",
});

const PLANT_GROWTH_STAGE = Object.freeze({
    BUDDING: "budding",
    FLOWERING: "flowering",
    FRUITING: "fruiting",
    GERMINATION: "germination",
    HARVESTING: "harvesting",
    SEEDLING: "seedling",
    VEGETATIVE: 'vegetative',
});

module.exports = {
    PLANT_CATEGORY,
    PLANT_GROWTH_CYCLE,
    PLANT_GROWTH_HABIT,
    PLANT_GROWTH_STAGE,
    PLANT_PURPOSE,
};
