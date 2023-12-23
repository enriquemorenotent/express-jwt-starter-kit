
# Express-JWT-Starter-Kit

## Description
A Node.js API boilerplate using Express.js, Sequelize ORM, and JWT for secure user authentication. Designed for rapid development, it provides a modular structure for easy customization, enhanced security features including rate limiting and CORS configuration, and is perfect for building scalable and secure APIs.

This backend is designed to work seamlessly with the [NextJS Frontend Starter Kit](https://github.com/enriquemorenotent/nextjs-frontend-starter-kit).

**Note:** The "Task" model provided is just an example to showcase how to manage CRUD resources and can be replaced with any model that suits your application's needs.


## Features
- User Authentication with JWT
- Password Hashing with bcrypt
- Sequelize ORM for SQL databases
- Rate Limiting for API security
- CORS Configuration for cross-origin requests
- Environment Variable Management with dotenv

## Installation
1. Clone the repository:

2. Navigate to the directory:
   ```bash
   cd express-jwt-starter-kit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
Start the server:
```bash
npm start
```

For development, with hot reload:
```bash
npm run dev
```

## API Endpoints
### Auth
- `POST /v1/auth/register`: Register a new user
- `POST /v1/auth/login`: Log in a user
- `POST /v1/auth/logout`: Log out a user

### Tasks

- `GET /v1/tasks`: Get all tasks for a user
- `POST /v1/tasks`: Create a new task
- `GET /v1/tasks/:id`: Get a task by ID
- `PUT /v1/tasks/:id`: Update a task by ID
- `DELETE /v1/tasks/:id`: Delete a task by ID

## Configuration
Set environment variables in `.env` file, using the `.env.example` file as a template.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License
This project is licensed under the [ISC License](LICENSE).