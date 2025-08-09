// src/api/services/pest-type-service.js

const PestType = require("../../db/models/PestType");

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
        save: savePestType,
    }
};

// Export the service function to be used in other modules
module.exports = { pestTypeService };
