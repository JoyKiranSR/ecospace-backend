// src/api/services/pest-type-service.js

// Custom module imports
const PestType = require("../../db/models/PestType");

const getAllPestTypes = async (isIncludeInActive = false) => {
    // Try to fetch all types
    try {
        const pestTypes = await PestType.findAll(isIncludeInActive ? {} : { where: { isActive: true } });
        return pestTypes.map(pestType => pestType.toJSON()); // Convert to plain objects
    } catch (error) {
        console.error("Error fetching all pest types: ", error?.message || error);
        throw new Error("Failed to fetch all pest types");
    } 
};

const removePestType = async (pestTypeId) => {
    // Try to remove from DB
    try {
        const [ updatedCount ] = await PestType.update({ isActive: false }, { where: { id: pestTypeId } });
        return updatedCount ?? null;
    } catch (error) {
        console.error("Error removing pest type: ", error?.message || error);
        throw new Error("Failed to remove pest type");
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

const updatePestTypeDetails = async (pestTypeId, pestTypeDetails) => {
    // Try to update pest type details
    try {
        const [ updatedCount, updatedRows ] = await PestType.update(pestTypeDetails, { where: { id: pestTypeId }, returning: true }); // returns updated result
        return updatedCount ? updatedRows[0].toJSON() : null; // Return converted plain object if updated, else return null
    } catch (error) {
        console.error("Error updating pest type details: ", error?.message || error);
        throw new Error("Failed to update pest type details");
    }
};

const pestTypeService = () => {
    return {
        getAll: getAllPestTypes,
        remove: removePestType,
        save: savePestType,
        update: updatePestTypeDetails,
    }
};

// Export the service function to be used in other modules
module.exports = { pestTypeService };
