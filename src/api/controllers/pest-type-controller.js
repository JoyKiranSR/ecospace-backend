// src/api/controllers/pest-type-controller.js

// Custom module imports
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
        console.error("Failed to create pest type: ", error.message);
        return res.status(500).json({ message: error.message })
    }
};

const deletePestTypeById = async (req, res) => {
    // Get ID of pest type from req params
    const pestTypeId = req.params["pest_type_id"];
    if (!pestTypeId) return res.status(400).json({ message: "pest_type_id is required" });

    // Try to delete the pest type
    try {
        const pestType = await service.remove(pestTypeId);
        if (!pestType) return res.status(404).json({ message: "Pest type not found" });
        return res.status(204).send();
    } catch (error) {
        console.error("Failed to delete pest type: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

const fetchAllPestTypes = async (_req, res) => {
    try {
        const pestTypes = await service.getAll();
        return res.status(200).json({ data: pestTypes, message: "Fetched all pest types successfully" });
    } catch (error) {
        console.error("Failed to fetch all pest types: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

const patchUpdatePestTypeById = async (req, res) => {
    // Props that can be updated
    const patchUpdateFields = ["description"];

    // Get ID of pest type from req params
    const pestTypeId = req.params["pest_type_id"];
    if (!pestTypeId) return res.status(400).json({ message: "pest_type_id is required" });

    // Get body params from req body
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Required body" });
    const bodyParams = Object.keys(body);
    if (!bodyParams.length || !bodyParams.some(param => patchUpdateFields.includes(param))) return res.status(400).json({ messsage: "No details to update" });

    // Destructure to get fields to be updated
    const { description } = body;
    
    // Add provided field values for update (if any)
    let pestTypeDetails = {};
    if (description) pestTypeDetails.description = description;

    // Try to update details
    try {
        const pestType = await service.update(pestTypeId, pestTypeDetails);
        if (!pestType) res.status(404).json({ data: null, message: "Pest type not found" });
        return res.status(200).json({ data: pestType, message: "Updated pest type details successfully" });
    } catch (error) {
        console.error("Failed to patch update pest type details: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

const pestTypeController = () => {
    return {
        create: createPestType,
        delete: deletePestTypeById,
        fetchAll: fetchAllPestTypes,
        patchUpdate: patchUpdatePestTypeById,
    };
};

// Export controller to use in routes
module.exports = { pestTypeController };
