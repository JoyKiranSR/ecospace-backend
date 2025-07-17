const initPlantsDB = () => {
    let counter = 0;
    const plants = new Map();

    return {
        add: (plant) => {
            plants.set(++counter, plant);
            return plants.get(counter);
        }
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

module.exports = { savePlant };
