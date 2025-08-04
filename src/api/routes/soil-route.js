// src/api/routes/soil-route.js

/**
 * @module soil-route
 * Ecospace Soil Routes
 * 
 * @description This module defines the routes for soil-related endpoints in the Ecospace backend.
 * It includes routes for creating soil, fetching all soils, and fetching a soil by its ID.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 * 
 * @requires express
 * @exports routes
 */

// Core module imports
const { Router } = require("express");
const { soilValidator } = require("../middlewares/soil-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");
const { createSoil, deleteSoilById, fetchSoilById, fetchAllSoils, updateSoilDetailsById } = require("../controllers/soil-controller");

// Initialize the router
const routes = Router();
const validator = soilValidator();

// Define the soil routes
routes.all("/", (req, res, next) => {
    if (!["POST", "GET"].includes(req.method)) {
        console.warn(`Method ${req.method} not allowed on /soils`);
        // Handle unsupported methods
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    next();
});
routes.post("/", validator.create(), validationErrorHandler, createSoil);
routes.get("/", validator.get(), validationErrorHandler, fetchAllSoils);
routes.get("/:soil_id", validator.id(), validationErrorHandler, fetchSoilById);
routes.patch("/:soil_id", validator.id(), validator.patchOne(), validationErrorHandler, updateSoilDetailsById);
routes.delete("/:soil_id", validator.id(), validationErrorHandler, deleteSoilById);

// Export the routes for use in the main application
module.exports = routes;
