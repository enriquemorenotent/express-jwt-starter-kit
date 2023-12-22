const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
	try {
		const task = await Task.create({ ...req.body, userId: req.user.id });
		res.status(201).json(task);
	} catch (error) {
		next(error);
	}
};

exports.getAllTasks = async (req, res, next) => {
	try {
		const tasks = await Task.findAll({ where: { userId: req.user.id } });
		res.json(tasks);
	} catch (error) {
		next(error);
	}
};

exports.getTaskById = async (req, res, next) => {
	try {
		const task = await Task.findOne({
			where: { id: req.params.id, userId: req.user.id },
		});
		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.json(task);
	} catch (error) {
		next(error);
	}
};

exports.updateTask = async (req, res, next) => {
	try {
		const where = { id: req.params.id, userId: req.user.id };
		const [updated] = await Task.update(req.body, { where });
		if (!updated) throw new Error('Task not found or access denied');
		const updatedTask = await Task.findByPk(req.params.id);
		res.json(updatedTask);
	} catch (error) {
		next(error);
	}
};

exports.deleteTask = async (req, res, next) => {
	try {
		const where = { id: req.params.id, userId: req.user.id };
		const deleted = await Task.destroy({ where });
		if (!deleted) throw new Error('Task not found or access denied');
		res.send('Task deleted successfully');
	} catch (error) {
		next(error);
	}
};
