const { Router } = require("express");
const { PLANT_CATEGORY, PLANT_GROWTH_CYCLE, PLANT_GROWTH_HABIT, PLANT_PURPOSE } = require("../../constants/plant-constant");
const { SEASON } = require("../../constants/season-constant");
const { savePlant } = require("../services/plant-service");

const routes = Router();

routes.post("/", (req, res) => {
    let plantDetails = {};
    if (!req.body) return res.status(400).json({ message: "Required body" });
    const { category, common_names: commonNames, common_pests: commonPests, compatible_plants: compatiblePlants,
        growth_cycle: growthCycle, growth_habit: growthHabit, growth_stages: growthStages,
        ideal_season: idealSeason, name, purpose, recommended_fertilizers: recommendedFertilizers,
        region_compatibility: regionCompatibility, scientific_name: scientificName, tags } = req.body;
    
    /**
     * Mandatory fields check:
     * 
     * category, growth_cycle, growth_habit, ideal_season, purpose
     */ 
    if (!category || !growthCycle || !growthHabit || !idealSeason || !name || !purpose)
        return res.status(400).json({ message: "Missing mandatory field(s) from [category, growth_cycle, growth_habit, ideal_season, purpose]" });

    /**
     * Validations:
     * 
     * category: plant/crop
     * growth_cycle: annual/biennial/perennial
     * growth_habit: climber/creeper/herb/herbaceous/grass/shrub/tree
     * ideal_season: autumn/monsoon/spring/summer/winter
     * name: string
     * purpose: flower/fodder/fruit/herb/medicine/spice/vegetable
     */
    if (!Object.values(PLANT_CATEGORY).includes(category) || !Object.values(PLANT_GROWTH_CYCLE).includes(growthCycle) ||
        !Object.values(PLANT_GROWTH_HABIT).includes(growthHabit) || !Object.values(SEASON).includes(idealSeason) ||
        !Object.values(PLANT_PURPOSE).includes(purpose) || typeof name !== "string"
    )
        return res.status(400).json({ message: "Invalid field(s)" });

    // Add values to plant object
    plantDetails = { name, category, growthCycle, growthHabit, idealSeason, purpose };

    /**
     * validations: Optional values
     * Add to plant details if valid
     *
     * common_names: Array of strings
     * common_pests: Array of strings
     * compatible_plants: Array of strings
     * recommended_fertilizers: Array of strings
     * region_compatibility: Array of strings
     * scientific_name: string
     * tags: Array of strings
     */
    if (commonNames && Array.isArray(commonNames) && commonNames.every(item => typeof item === "string"))
        plantDetails.commonNames = commonNames;
    if (commonPests && Array.isArray(commonPests) && commonPests.every(item => typeof item === "string"))
        plantDetails.commonPests = commonPests;
    if (compatiblePlants && Array.isArray(compatiblePlants) && compatiblePlants.every(item => typeof item === "string"))
        plantDetails.compatiblePlants = compatiblePlants;
    if (recommendedFertilizers && Array.isArray(recommendedFertilizers) && recommendedFertilizers.every(item => typeof item === "string"))
        plantDetails.recommendedFertilizers = recommendedFertilizers;
    if (regionCompatibility && Array.isArray(regionCompatibility) && regionCompatibility.every(item => typeof item === "string"))
        plantDetails.regionCompatibility = regionCompatibility;
    if (scientificName && typeof scientificName === "string") plantDetails.scientificName = scientificName;
    if (tags && Array.isArray(tags) && tags.every(item => typeof item === "string"))
        plantDetails.tags = tags;

    // Save to DB
    const plant = savePlant(plantDetails);
    return res.status(201).send({ data: plant, message: "Created successfully" });
});

module.exports = routes;
