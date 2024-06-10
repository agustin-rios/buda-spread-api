# Buda Spread API

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Docker Compose](#docker-compose)
- [Contributing](#contributing)
- [License](#license)

## Description

Buda Spread API is a Node.js application built with TypeScript, designed to provide API endpoints for various functionalities. This project leverages Express.js for server-side operations, Axios for HTTP requests, and Jest for testing.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

### Building the Project

To compile the TypeScript code into JavaScript, use the following command:

```bash
npm run build
```

### Starting the Server

To start the server, run:

```bash
npm start
```

### Development Mode

For development, you can use Nodemon to automatically restart the server on code changes:

```bash
npm run dev
```

## Scripts

- `build`: Compiles the TypeScript code.
- `start`: Runs the compiled JavaScript code.
- `dev`: Runs the server in development mode with Nodemon.
- `test`: Runs the test suite using Jest with coverage and verbose output.

## Environment Variables

The project uses environment variables for configuration. An example file `.env.example` is provided to help you set up your environment variables. Copy this file to `.env` and update the values as needed.

```env
# .env.example
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

## Docker

### Building the Docker Image

To build the Docker image for the project, use the following command:

```bash
docker build -t buda-spread-api .
```

### Running the Docker Container

To run the Docker container, use:

```bash
docker run -p 3000:3000 --env-file .env buda-spread-api
```

## Docker Compose

### Starting the Services

To start the services using Docker Compose, use the following command:

```bash
docker-compose up
```

### Stopping the Services

To stop the services, use:

```bash
docker-compose down
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
