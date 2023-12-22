const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Task extends Model {}

Task.init(
	{
		title: { type: DataTypes.STRING, allowNull: false },
		deadline: { type: DataTypes.DATE, allowNull: true },
		completed: { type: DataTypes.BOOLEAN, defaultValue: false },
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		},
	},
	{ sequelize, modelName: 'Task' }
);

module.exports = Task;
