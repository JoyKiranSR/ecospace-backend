const { Router } = require("express");

const { plantValidator } = require("../middlewares/plant-middleware");
const { getAllPlants, savePlant, getPlantById } = require("../services/plant-service");

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
    if (commonNames) plantDetails.commonNames = commonNames;
    if (commonPests) plantDetails.commonPests = commonPests;
    if (compatiblePlants) plantDetails.compatiblePlants = compatiblePlants;
    if (growthStages) plantDetails.growthStages = growthStages;
    if (recommendedFertilizers) plantDetails.recommendedFertilizers = recommendedFertilizers;
    if (regionCompatibility) plantDetails.regionCompatibility = regionCompatibility;
    if (scientificName) plantDetails.scientificName = scientificName;
    if (tags) plantDetails.tags = tags;

    // Save to DB
    const plant = savePlant(plantDetails);
    return res.status(201).send({ data: plant, message: "Created successfully" });
});

routes.get("/", (_req, res) => {
    // Fetch all plants from DB
    const plants = getAllPlants();
    return res.status(200).json({ data: plants, message: "Retrieved all plants successfully" });
});

routes.get("/:plantId", (req, res) => {
    // Get plant id from path params
    const plantId = req.params.plantId;
    // Fetch plant details by its id
    const plant = getPlantById(plantId);
    const message = plant ? "Retrieved plant details successfully" : "Plant details not found";
    return res.status(200).json({ data: plant, message });
});

module.exports = routes;
