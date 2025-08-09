// src/api/controllers/pest-type-controller.js

const { pestTypeService } = require("../services/pest-type-service");

const service = pestTypeService();

const createPestType = async (req, res) => {
    // Get pest type details from request body
    const { description, name } = req.body;
    let pestTypeDetails = { name };
    // Add optional fields
    if (description) pestTypeDetails.description = description;

    // Try to save details
    try {
        const pestType = await service.save(pestTypeDetails);
        return res.status(201).json({ data: pestType, message: "Pest type created successfully"});
    } catch (error) {
        console.error("Failed to create pest type: ", error?.message || error);
        return res.status(500).json({ message: error.message })
    }
};

const pestTypeController = () => {
    return {
        create: createPestType,
    };
};

// Export controller to use in routes
module.exports = { pestTypeController };
