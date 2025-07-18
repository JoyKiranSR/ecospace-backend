const { Router } = require("express");

const { plantValidator } = require("../middlewares/plant-middleware");
const { createPlant, fetchAllPlants, fetchPlantById } = require("../controllers/plant-controller");

const routes = Router();
const validator = plantValidator();

routes.post("/", validator.create(), validator.errorHandler, createPlant);
routes.get("/", fetchAllPlants);
routes.get("/:plantId", validator.id(), validator.errorHandler, fetchPlantById);

module.exports = routes;
