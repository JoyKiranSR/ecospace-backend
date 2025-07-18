// index.js

/**
 * @module index
 * Ecospace Backend Server
 * 
 * @description This is the main entry point for the Ecospace backend server.
 * It sets up an Express server that listens on port 7000 and provides routes for 
 * various ecospace services.
 * 
 * @requires express
 * @requires plant-route
 */

// Core module imports
const express = require("express");
// Custom module imports
const plantRoutes = require("./src/api/routes/plant-route");

// Initialize the Express application
const app = express();
const PORT = 7000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse various ecospace service routes
app.use("/plants", plantRoutes);
app.get("/", (_req, res) => res.status(200).send("Welcome to Ecospace backend"));

// Start the server and listen on the specified port
app.listen(PORT, () => console.log("Ecospace backend running on PORT %d", PORT));
