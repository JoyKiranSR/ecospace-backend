// src/api/routes/pest-type-route.js

// Core module imports
const { Router } = require("express");

// Custom module imports
const { pestTypeController } = require("../controllers/pest-type-controller");
const { pestTypeValidator } = require("../middlewares/pest-type-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");

// Initialize the router
const route = Router();
const validator = pestTypeValidator(); // Creates a validator to handle pest type
const controller = pestTypeController(); // Creates a controller to handle routes

// Add route endpoints
route.post("/",  validator.create, validationErrorHandler, controller.create);
route.get("/", controller.fetchAll);
route.patch("/:pest_type_id", validator.id, validator.patchOne, validationErrorHandler, controller.patchUpdate);
route.delete("/:pest_type_id", validator.id, validationErrorHandler, controller.delete);

// Export routes to map to application
module.exports = route;
