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
const plantRoutes = require("./api/routes/plant-route");
const soilRoutes = require("./api/routes/soil-route");

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse various ecospace service routes
app.use("/plants", plantRoutes); // Plant-related routes
app.use("/soils", soilRoutes); // Soil-related routes
app.get("/", (_req, res) => res.status(200).send("Welcome to Ecospace backend"));

// Export the app for use in other modules
module.exports = app;
