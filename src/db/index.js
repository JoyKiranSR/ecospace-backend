// src/db/index.js

/**
 * @module db
 * Ecospace Database Connection
 * 
 * @description This module establishes a connection to the PostgreSQL database using Sequelize ORM.
 * It initializes the Sequelize instance with database credentials and configuration,
 * and exports the Sequelize instance for use in other modules.
 *
 * @requires sequelize
 * @exports sequelize
 */

// Core module imports
const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('ecospacedb', 'ecospace', 'ecospace', {
    host: 'localhost',
    dialect: 'postgres',
    port: 7050,
    logging: false, // Disable logging for cleaner output
});

/**
 * @function connect
 * @async
 * 
 * @description Establishes a connection to the PostgreSQL database.
 * It authenticates the connection and logs a success message if successful,
 * or an error message if the connection fails.
 * 
 * @param {void}
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 * @throws {Error} - Throws an error if the connection fails.
 */
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.debug('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error?.message || error);
        // Handle specific error cases if needed
    }
};

// Call the connect function to establish the database connection
connect();

// Export the Sequelize instance for use in other modules
// This allows other modules to use the sequelize instance for database operations
module.exports = sequelize;
