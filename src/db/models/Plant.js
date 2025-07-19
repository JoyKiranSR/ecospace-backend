const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const { PLANT_CATEGORY, PLANT_GROWTH_CYCLE, PLANT_GROWTH_HABIT, PLANT_PURPOSE, PLANT_GROWTH_STAGE } = require('../../constants/plant-constant');
const { SEASON } = require('../../constants/season-constant');

// Define Plant model
const Plant = sequelize.define('Plant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20), // Limit to 20 characters
        unique: true, // Ensure plant names are unique
        allowNull: false, // Required field
    },
    category: {
        type: DataTypes.ENUM(Object.values(PLANT_CATEGORY)), // Use constants
        allowNull: false, // Required field
    },
    growthCycle: {
        type: DataTypes.ENUM(Object.values(PLANT_GROWTH_CYCLE)), // Use constants
        field: 'growth_cycle', // Use snake_case for database field
        allowNull: false, // Required field
    },
    growthHabit: {
        type: DataTypes.ENUM(Object.values(PLANT_GROWTH_HABIT)), // Use constants
        field: 'growth_habit', // Use snake_case for database field
        allowNull: false, // Required field
    },
    idealSeason: {
        type: DataTypes.ENUM(Object.values(SEASON)), // Use constants
        field: 'ideal_season', // Use snake_case for database field
        allowNull: false, // Required field
    },
    purpose: {
        type: DataTypes.ENUM(Object.values(PLANT_PURPOSE)), // Use constants
        allowNull: false, // Required field
    },
    commonNames: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'common_names', // Use snake_case for database field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    commonPests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'common_pests', // Use snake_case for database field
        allowNull: true, // Optional field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    compatiblePlants: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'compatible_plants', // Use snake_case for database field
        allowNull: true, // Optional field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    growthStages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'growth_stages', // Use snake_case for database field
        // Custom validation to ensure growth_stages is an array of allowed growth stages
        validate: {
            isValidGrowthStages(value) {
                if (!value) return; // Skip validation if value is null or undefined
                if (!Array.isArray(value)) throw new Error('growth_stages must be an array');
                const growthStages = Object.values(PLANT_GROWTH_STAGE);
                const invalid = value.filter(stage => !growthStages.includes(stage));
                if (invalid.length > 0) {
                    throw new Error(`Invalid growth stage(s): ${invalid.join(', ')}`);
                }
            }
        },
        defaultValue: [], // Default to an empty array if no value is provided
    },
    recommendedFertilizers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'recommended_fertilizers', // Use snake_case for database field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    regionCompatibility: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'region_compatibility', // Use snake_case for database field
        defaultValue: [], // Default to an empty array if no value is provided
    },
    scientificName: {
        type: DataTypes.STRING(50), // Limit to 50 characters
        field: 'scientific_name', // Use snake_case for database field
        unique: true, // Ensure scientific names are unique
        allowNull: true, // Optional field
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // Default to an empty array if no value is provided
    },
}, {
    timestamps: true,
    tableName: 'plants', // Set table name
});

module.exports = Plant;
