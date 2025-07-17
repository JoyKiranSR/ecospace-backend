const { Router } = require("express");

const { PLANT_CATEGORY, PLANT_GROWTH_CYCLE, PLANT_GROWTH_HABIT, PLANT_PURPOSE } = require("../../constants/plant-constant");
const { SEASON } = require("../../constants/season-constant");
const { plantValidator } = require("../middlewares/plant-middleware");
const { savePlant } = require("../services/plant-service");

const routes = Router();
const validator = plantValidator();

routes.post("/", validator.create(), validator.errorHandler, (req, res) => {
    let plantDetails = {};
    if (!req.body) return res.status(400).json({ message: "Required body" });
    const { category, common_names: commonNames, common_pests: commonPests, compatible_plants: compatiblePlants,
        growth_cycle: growthCycle, growth_habit: growthHabit, growth_stages: growthStages,
        ideal_season: idealSeason, name, purpose, recommended_fertilizers: recommendedFertilizers,
        region_compatibility: regionCompatibility, scientific_name: scientificName, tags } = req.body;

    // Add values to plant object
    plantDetails = { name, category, growthCycle, growthHabit, idealSeason, purpose };

    // Add optional values
    plantDetails = { ...plantDetails, commonNames, commonPests, compatiblePlants, growthStages, recommendedFertilizers,
        regionCompatibility, scientificName, tags };

    // Save to DB
    const plant = savePlant(plantDetails);
    return res.status(201).send({ data: plant, message: "Created successfully" });
});

module.exports = routes;
