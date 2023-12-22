require('dotenv').config();

const bcrypt = require('bcrypt');
const sequelize = require('./src/config/database');
const User = require('./src/models/user');

// Sample users data
const usersData = [
	{
		email: 'enriquemorenotent@gmail.com',
		password: 'notelodire',
		// tasks: [{ title: 'Do laundry' }, { title: 'Grocery shopping' }],
	},
	{
		email: 'user2@example.com',
		password: 'password2',
		// tasks: [{ title: 'Email clients' }, { title: 'Prepare presentation' }],
	},
	// Add more user objects as needed
];

async function seed() {
	try {
		await sequelize.sync({ force: true });

		for (const userData of usersData) {
			const hashedPassword = bcrypt.hashSync(userData.password, 10);
			const user = await User.create({
				email: userData.email,
				password: hashedPassword,
			});

			// Insert seed data for the user
			await Promise.all([
				// ...userData.tasks.map((task) =>
				// 	Task.create({ ...task, userId: user.id })
				// ),
				// ...userData.habits.map((habit) =>
				// 	Habit.create({ ...habit, userId: user.id })
				// ),
				// ...userData.contacts.map((contact) =>
				// 	Contact.create({ ...contact, userId: user.id })
				// ),
				// ...userData.places.map((place) =>
				// 	Place.create({ ...place, userId: user.id })
				// ),
			]);
		}

		console.log('Database seeded!');
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	}
}

seed();
