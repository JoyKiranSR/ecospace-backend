const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('ecospacedb', 'ecospace', 'ecospace', {
    host: 'localhost',
    dialect: 'postgres',
    port: 7050,
    logging: false, // Disable logging for cleaner output
});

// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await sequelize.sync({ alter: true, logging: false }); // Sync models with the database
        console.log('Database models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error?.message);
    }
})();

module.exports = sequelize;
