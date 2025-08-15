// src/api/routes/pathogen-type-route.js

/**
 * @module pathogen-type-route
 * Ecospace Pathogen Type Route
 *
 * @description This module defines the route to handle pathogen type-related endpoints in the Ecospace backend.
 * It includes routes for fetching all pathogen types, fetching a pathogen type by its ID, creating a new pathogen type,
 * updating a pathogen type, and deleting a pathogen type.
 *
 * @requires pathogen-type-controller
 * @exports route
 */

// Core module imports
const { Router } = require("express");

// Custom module imports
const { pathogenTypevalidator } = require("../middlewares/pathogen-type-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");
const { createPathogenType, deletePathogenType, fetchAllPathogenTypes, fetchPathogenTypeById,
    updatePathogenType } = require("../controllers/pathogen-type-controller");

// Create an express route
const route = Router();
// Create a middleware to validate pathogen type data
const validator = pathogenTypevalidator();

// Apply validation middleware to the routes
// Define routes
route.post("/", validator.create(), validationErrorHandler, createPathogenType);
route.get("/", fetchAllPathogenTypes);
route.get("/:pathogen_type_id", validator.id(), validationErrorHandler, fetchPathogenTypeById);
route.patch("/:pathogen_type_id", validator.id(), validator.update(), validationErrorHandler, updatePathogenType);
route.delete("/:pathogen_type_id", validator.id(), validationErrorHandler, deletePathogenType);

// Export the route for use in the main application
module.exports = route;
