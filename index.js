// index.js

/**
 * @module index
 * Ecospace Backend Server
 * 
 * @description This module serves as server entry point for the Ecospace backend application.
 * It initializes the Express application and starts the server on a specified port.
 * The server listens for incoming requests and handles them through application defined routes.
 * 
 * @requires app
 */

// Custom module imports
const app = require("./src/app");

// Port configuration
const PORT = 7000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log("Ecospace backend running on PORT %d", PORT));
