// src/app.js

/**
 * @module app
 * Ecospace Entrypoint Application
 * 
 * @description This module sets up the Express application for the Ecospace backend.
 * It initializes the application, configures middleware for JSON parsing,
 * and defines routes for plant-related operations.
 * This is the entry point for the Ecospace backend application.
 * 
 * @requires express
 * @requires plant-route
 * @exports app
 */

// Core module imports
const express = require("express");
// Custom module imports
const plantRoutes = require("./api/routes/plant-route");

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse various ecospace service routes
app.use("/plants", plantRoutes);
app.get("/", (_req, res) => res.status(200).send("Welcome to Ecospace backend"));

// Export the app for use in other modules
module.exports = app;
