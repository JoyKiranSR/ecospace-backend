// src/api/routes/pest-route.js

/**
 * @module pest-route
 * Ecospace Pest Routes
 * 
 * @description This module defines the routes for pest-related endpoints in the Ecospace backend.
 * It includes routes for creating a pest, fetching all pests, fetching a pest by its ID, updating a pest, and deleting a pest.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 * 
 * @requires express
 * @requires pest-controller
 * @requires pest-middleware
 * @requires error-middleware
 * @exports routes
 */

// Core module imports
const { Router } = require("express");

// Custom module imports
const { createPest, deletePestById, fetchAllPests, fetchPestById, updatePestDetailsById } = require("../controllers/pest-controller");
const { pestValidator } = require("../middlewares/pest-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");

// Initialize the router and validator
const routes = Router();
const validator = pestValidator();

// Define the pest routes
routes.post("/", validator.create(), validationErrorHandler, createPest);
routes.get("/", fetchAllPests);
routes.get("/:pest_id", validator.id(), validationErrorHandler, fetchPestById);
routes.patch("/:pest_id", validator.id(), validator.patchOne(), validationErrorHandler, updatePestDetailsById);
routes.delete("/:pest_id", validator.id(), validationErrorHandler, deletePestById);

// Export the routes for use in the main application
module.exports = routes;
