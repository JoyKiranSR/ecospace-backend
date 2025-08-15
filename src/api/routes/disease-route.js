// src/api/routes/disease-route.js

/**
 * @module disease-route
 * Ecospace Disease Routes
 * 
 * @description This module defines the routes for disease-related endpoints in the Ecospace backend.
 * It includes routes for creating a disease, fetching all diseases, fetching a disease by its ID,
 * updating a disease, and deleting a disease.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 * 
 * @requires express
 * @requires disease-middleware
 * @requires disease-controller
 * @requires express-validator
 * @exports routes
 */

// Core module imports
const { Router } = require("express");

// Custom module imports
const { diseaseValidator } = require("../middlewares/disease-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");
const { createDisease, deleteDisease, fetchAllDiseases, fetchDiseaseById,
    updateDiseaseById } = require("../controllers/disease-controller");

// Initialize the router and validator
const routes = Router();
const validator = diseaseValidator();

// Define the disease routes
routes.post("/", validator.create(), validationErrorHandler, createDisease);
routes.get("/", fetchAllDiseases);
routes.get("/:disease_id", validator.id(), validationErrorHandler, fetchDiseaseById);
routes.patch("/:disease_id", validator.id(), validator.update(), validationErrorHandler, updateDiseaseById);
routes.delete("/:disease_id", validator.id(), validationErrorHandler, deleteDisease);

// Export the routes for use in the main application
module.exports = routes;
