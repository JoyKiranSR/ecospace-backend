// src/api/middlewares/error-middleware.js

/**
 * @module error-middleware
 * Ecospace Error Middleware
 * 
 * @description This module defines middleware functions for handling errors in the Ecospace backend.
 * It provides a centralized error handling mechanism that captures errors thrown in the application,
 * logs them, and sends appropriate responses to the client.
 * 
 * @requires express
 * @exports errorHandler
 */

// Core module imports
const { matchedData, validationResult } = require("express-validator");

/**
 * @function validationErrorHandler
 * 
 * @description Middleware function to handle validation errors in the request.
 * It checks for validation errors and sanitizes the request query parameters.
 * If there are validation errors, it returns a 400 status with an error message.
 * 
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {Function} next - The next middleware function to call if validation passes.
 * @return {void} - Calls next() if validation passes, or returns a 400 status with an error message if validation fails.
 */
const validationErrorHandler = (req, res, next) => {
    const result = validationResult(req)
    const errors = result.array().map(({ msg, path }) => ({ field: path, message: msg }));
    if (!result.isEmpty()) return res.status(400).json({ message: "Validation error", errors });
    // Add sanitized query parameters to request object
    // NOTE: From express 5, req.query is immutable
    req.sanitizedQuery = matchedData(req, { locations: ["query"] });
    req.query.length && console.debug(req.sanitizedQuery);
    next();
}

module.exports = { validationErrorHandler };
