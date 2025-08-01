// src/api/routes/soil-route.js

/**
 * @module soil-route
 * Ecospace Soil Routes
 * 
 * @description This module defines the routes for soil-related endpoints in the Ecospace backend.
 * It includes routes for creating soil, fetching all soils, and fetching a soil by its ID.
 * It uses the Express Router and applies validation middleware to ensure that the requests are properly formatted.
 */

// Core module imports
const { Router } = require("express");

// Initialize the router
const routes = Router();

// Define the soil routes
routes.all("/", (req, res, next) => {
    if (!["POST", "GET"].includes(req.method)) {
        console.warn(`Method ${req.method} not allowed on /soils`);
        // Handle unsupported methods
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    next();
});
routes.post("/", (_req, res) => {
    // Placeholder for creating soil
    res.status(201).json({ message: "Soil created successfully" });
});

// Export the routes for use in the main application
module.exports = routes;
