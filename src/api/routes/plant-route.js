// src/api/routes/plant-route.js

/**
 * @module plant-route
 * Ecospace Plant Routes
 * 
 * @description This module defines the routes for plant-related endpoints in the Ecospace backend.
 * It includes routes for creating a plant, fetching all plants, and fetching a plant by its ID.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 * 
 * @requires express
 * @requires plant-middleware
 * @requires plant-controller
 * @requires express-validator
 * @exports routes
 */

// Core module imports
const { Router } = require("express");
// Custom module imports
const { plantValidator } = require("../middlewares/plant-middleware");
const { createPlant, deletePlantById, fetchAllPlants, fetchPlantById,
    updatePlantDetailsById } = require("../controllers/plant-controller");

// Initialize the router and validator
const routes = Router();
const validator = plantValidator();

// Define the plant routes
routes.post("/", validator.create(), validator.errorHandler, createPlant);
routes.get("/", validator.get(), validator.errorHandler, fetchAllPlants);
routes.get("/:plantId", validator.id(), validator.errorHandler, fetchPlantById);
routes.patch("/:plantId", validator.id(), validator.patchOne(), validator.errorHandler, updatePlantDetailsById);
routes.delete("/:plantId", validator.id(), validator.errorHandler, deletePlantById);

// Export the routes for use in the main application
module.exports = routes;
