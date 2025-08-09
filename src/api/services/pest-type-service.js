// src/api/services/pest-type-service.js

const PestType = require("../../db/models/PestType");

const getAllPestTypes = async () => {
    // Try to fetch all types
    try {
        const pestTypes = await PestType.findAll();
        return pestTypes.map(pestType => pestType.toJSON()); // Convert to plain objects
    } catch (error) {
        console.error("Error fetching all pest types: ", error?.message || error);
        throw new Error("Failed to fetch all pest types");
    } 
};

const savePestType = async (pestTypeDetails) => {
    // Try to save to DB
    try {
        const pestType = await PestType.create(pestTypeDetails);
        return pestType.toJSON(); // Convert to plain object from sequelize instance
    } catch (error) {
        console.error("Error saving pest type: ", error?.message || error);
        throw new Error("Failed to save pest type");
    }
};

const pestTypeService = () => {
    return {
        getAll: getAllPestTypes,
        save: savePestType,
    }
};

// Export the service function to be used in other modules
module.exports = { pestTypeService };
