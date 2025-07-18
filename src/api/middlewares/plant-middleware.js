const { body, matchedData, param, validationResult } = require("express-validator");

const validateNonEmptyStringArray = field =>
  body(field)
    .optional()
    .isArray({ min: 1 }).withMessage(`${field} must be a non-empty array`)
    .customSanitizer(arr =>
      arr.filter(item => typeof item === "string" && item.trim() !== "")
    )
    .custom(arr => arr.length > 0)
    .withMessage(`${field} must have at least one non-empty string`);

const createPlantValidator = [
    /**
     * Validations: Required values
     * 
     * category: plant/crop
     * growth_cycle: annual/biennial/perennial
     * growth_habit: climber/creeper/herb/herbaceous/grass/shrub/tree
     * ideal_season: autumn/monsoon/spring/summer/winter
     * name: string
     * purpose: flower/fodder/fruit/herb/medicine/spice/vegetable
     */
    body("category")
      .isIn(["plant", "crop"]).withMessage("category must be plant or crop"),
  
    body("growth_cycle")
      .isIn(["annual", "biennial", "perennial"]).withMessage(`growth_cycle must be one of ['annual', 'biennial', 'perennial']`),
  
    body("growth_habit")
      .isIn(["climber", "creeper", "herb", "herbaceous", "grass", "shrub", "tree"])
      .withMessage(`growth_habit must of one of ['climber', 'creeper', 'herb', 'herbaceous', 'grass', 'shrub', 'tree']`),
  
    body("ideal_season")
      .isIn(["autumn", "monsoon", "spring", "summer", "winter"])
      .withMessage(`ideal_season must be one of ['autumn', 'monsoon', 'spring', 'summer', 'winter']`),
  
    body("name")
      .isString().withMessage("name must be a string")
      .notEmpty().withMessage("name is required"),
  
    body("purpose")
      .isIn(["flower", "fodder", "fruit", "herb", "medicine", "spice", "vegetable"])
      .withMessage(`purpose must be one of ['flower', 'fodder', 'fruit', 'herb', 'medicine', 'spice', 'vegetable']`),

    /**
     * validations: Optional values
     *
     * common_names: Array of strings
     * common_pests: Array of strings
     * compatible_plants: Array of strings
     * recommended_fertilizers: Array of strings
     * region_compatibility: Array of strings
     * scientific_name: string
     * tags: Array of strings
     */
    validateNonEmptyStringArray("common_names"),
    validateNonEmptyStringArray("common_pests"),
    validateNonEmptyStringArray("compatible_plants"),
    validateNonEmptyStringArray("recommended_fertilizers"),
    validateNonEmptyStringArray("region_compatibility"),
    validateNonEmptyStringArray("tags"),

    body("scientific_name")
      .optional()
      .isString().withMessage("scientific_name must be a string")
      .notEmpty().withMessage("scientific_name cannot be empty")
      .trim()
];

const idValidator = [
    /**
     * Validations: Required path parameter
     * 
     * plantId: integer
     */
    param("plantId")
      .exists().withMessage("plantId is required")
      .isInt({ min: 1 }).withMessage("plantId must be a positive integer")
      .toInt()
];

const plantValidator = () => {
    return {
        create: () => createPlantValidator,
        errorHandler: (req, res, next) => {
            const result = validationResult(req)
            const errors = result.array().map(({ msg, path }) => ({ field: path, message: msg }));
            if (!result.isEmpty()) return res.status(400).json({ message: "Validation error", errors });
            // Add sanitized query parameters to request object
            req.sanitizedQuery = matchedData(req, { locations: ["query"] });
            next();
        },
        id: () => idValidator,
    };
};

module.exports = { plantValidator };
