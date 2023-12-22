const { Sequelize } = require('sequelize');

const { DB_DIALECT, DB_STORAGE, DB_LOGGING } = process.env;

const sequelize = new Sequelize({
	dialect: DB_DIALECT,
	storage: DB_STORAGE,
	logging: DB_LOGGING === 'true' ? console.log : false,
});

module.exports = sequelize;
