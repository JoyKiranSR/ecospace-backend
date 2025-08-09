// src/api/routes/pest-type-route.js

const { Router } = require("express");
const { pestTypeController } = require("../controllers/pest-type-controller");
const { pestTypeValidator } = require("../middlewares/pest-type-middleware");
const { validationErrorHandler } = require("../middlewares/error-middleware");

const route = Router();
const validator = pestTypeValidator(); // Creates a validator to handle pest type
const controller = pestTypeController(); // Creates a controller to handle routes

// Add route endpoints
route.post("/",  validator.create, validationErrorHandler, controller.create);
route.get("/", controller.fetchAll);

// Export routes to map to application
module.exports = route;
