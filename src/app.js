// src/app.js

/**
 * @module app
 * 
 * @description Initializes the Express application and configures middleware and routes.
 * This application serves as the backend for the Ecospace project, handling requests related to plants and soils.
 * It is the main entry point for the Ecospace backend application.
 *
 * @type {Express.Application}
 * @requires express
 * @requires plant-route
 * @exports app
 */

// Core module imports
const express = require("express");

// Custom module imports
const growthStageRoutes = require("./api/routes/growth-stage-route");
const pestTypeRoutes = require("./api/routes/pest-type-route"); 
const plantRoutes = require("./api/routes/plant-route");
const soilRoutes = require("./api/routes/soil-route");

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse various ecospace service routes
// Routes to handle and manage resources operating on master tables
app.use("/growth-stages", growthStageRoutes); // GrowthStage-related routes
app.use("/pest-types", pestTypeRoutes); // PestType-related routes

// Routes to handle and manage resources operating on feature tables
app.use("/plants", plantRoutes); // Plant-related routes
app.use("/soils", soilRoutes); // Soil-related routes
app.get("/", (_req, res) => res.status(200).send("Welcome to Ecospace backend"));

// Export the app for use in other modules
module.exports = app;
