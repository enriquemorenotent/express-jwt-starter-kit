const express = require('express');
const authenticate = require('../middleware/authenticate');
const {
	createTask,
	getTaskById,
	getAllTasks,
	updateTask,
	deleteTask,
} = require('../controllers/taskController');
const { defaultRateLimit } = require('../helpers/ratelimiter');

const router = express.Router();

router.post('/', defaultRateLimit, authenticate, createTask);
router.get('/', defaultRateLimit, authenticate, getAllTasks);
router.get('/:id', defaultRateLimit, authenticate, getTaskById);
router.put('/:id', defaultRateLimit, authenticate, updateTask);
router.delete('/:id', defaultRateLimit, authenticate, deleteTask);

module.exports = router;
