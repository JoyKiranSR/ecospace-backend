const initPlantsDB = () => {
    let counter = 0;
    const plants = new Map();

    return {
        add: (plant) => {
            plants.set(++counter, plant);
            console.log(plants)
            return plants.get(counter);
        },
        getAll: () => Array.from(plants.values()),
        getById: (id) => plants.get(id) ?? null
    }
}
const plantDB = initPlantsDB();

const savePlant = (plantDetails) => {
    // Create a new Plant object out of the plant details
    let plant = Object.create({});
    plant = { ...plantDetails };
    // Save to DB
    return plantDB.add(plant);
};

const getAllPlants = () => {
    // Fetch all plants from DB
    return plantDB.getAll();
};

const getPlantById = (plantId) => {
    // Fetch a plant by its id from DB
    return plantDB.getById(parseInt(plantId));
};

module.exports = { getAllPlants, getPlantById, savePlant };
