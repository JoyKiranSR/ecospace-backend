// src/api/routes/growth-stage-route.js

/**
 * @module growth-stage-route
 * Ecospace GrowthStage Routes
 * 
 * @description This module defines the routes for growth stage-related endpoints in the Ecospace backend.
 * It includes routes for creating growth stage, fetching all growth stages, and fetching a growth stage by its ID.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 * 
 * @requires express
 * @exports routes
 */

// Core module imports
const { Router } = require("express");
// const { growthStageValidator } = require("../middlewares/growth-stage-middleware");
// const { validationErrorHandler } = require("../middlewares/error-middleware");
const { createGrowthStage, fetchAllGrowthStages, fetchGrowthStageById } = require("../controllers/growth-stage-controller");
const { growthStageValidator } = require("../middlewares/growth-stage-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");

// Initialize the router
const routes = Router();
const validator = growthStageValidator();

// Define the growth stage routes
routes.post("/", validator.create(), validationErrorHandler, createGrowthStage);
routes.get("/", fetchAllGrowthStages);
routes.get("/:growth_stage_id", validator.id(), validationErrorHandler, fetchGrowthStageById);

// Export the routes for use in the main application
module.exports = routes;
