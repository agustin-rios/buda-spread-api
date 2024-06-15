# Buda Spread API

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Docker Compose](#docker-compose)
- [Endpoints](#endpoints)
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
```

## Docker

### Building the Docker Image

To build the Docker image for the project, use the following command:

```bash
docker build 
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

## Endpoints


### 1. Get Update Alert By Market ID
- **Route**: `/api/poll/:marketId`
- **Method**: GET
- **Description**: Checks the current spread for a specific market and compares it to the stored alert spread.
- **Arguments**:
  - `marketId` (required, string): The ID of the market to check.
- **Responses**:
  - **200 OK**: Returns the spread comparison result.
    ```json
    {
      "message": "Spread is greater than the alert",
      "state": true
    }
    ```
    ```json
    {
      "message": "Spread is lower than the alert",
      "state": true
    }
    ```
    ```json
    {
      "message": "Spread is equal to the alert",
      "state": false
    }
    ```
    ```json
    {
      "message": "No spread calculated due to error",
      "state": false
    }
    ```
  - **404 Not Found**: Alert not found for the specified market ID.
    ```json
    {
      "message": "Alert not found"
    }
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 2. Get Update Alert On All Markets
- **Route**: `/api/poll`
- **Method**: GET
- **Description**: Checks the current spread for all markets and compares each to the stored alert spread.
- **Arguments**: None
- **Responses**:
  - **200 OK**: Returns a list of spread comparison results for all markets.
    ```json
    [
      {
        "message": "Spread is greater than the alert",
        "state": true
      },
      ...
    ]
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 3. Get Markets From Buda
- **Route**: `/api/buda/markets/`
- **Method**: GET
- **Description**: Retrieves a list of markets from Buda.
- **Arguments**: None
- **Responses**:
  - **200 OK**: Returns a list of markets.
    ```json
    [
      {
        "id": "market_id",
        "name": "Market Name",
        ...
      },
      ...
    ]
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 4. Get Market By ID From Buda
- **Route**: `/api/buda/markets/:marketId`
- **Method**: GET
- **Description**: Retrieves details of a specific market from Buda.
- **Arguments**:
  - `marketId` (required, string): The ID of the market.
- **Responses**:
  - **200 OK**: Returns the market details.
    ```json
    {
      "id": "market_id",
      "name": "Market Name",
      ...
    }
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 5. Get Market Order Book From Buda
- **Route**: `/api/buda/markets/:marketId/order_book`
- **Method**: GET
- **Description**: Retrieves the order book of a specific market from Buda.
- **Arguments**:
  - `marketId` (required, string): The ID of the market.
- **Responses**:
  - **200 OK**: Returns the order book of the market.
    ```json
    {
      "order_book": {
        "bids": [...],
        "asks": [...]
      }
    }
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 6. Get Market Spread
- **Route**: `/api/buda/markets/:marketId/spread`
- **Method**: GET
- **Description**: Calculates and retrieves the spread for a specific market.
- **Arguments**:
  - `marketId` (required, string): The ID of the market.
- **Responses**:
  - **200 OK**: Returns the calculated spread.
    ```json
    {
      "spread": 0.01,
      "error": null
    }
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 7. Get All Market Spreads
- **Route**: `/api/buda/markets/spreads`
- **Method**: GET
- **Description**: Calculates and retrieves the spreads for all markets.
- **Arguments**: None
- **Responses**:
  - **200 OK**: Returns a list of spreads for all markets.
    ```json
    [
      {
        "marketId": "market_id",
        "spread": 0.01,
        "error": null
      },
      ...
    ]
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 8. Post Spread Alert
- **Route**: `/api/alert/spread`
- **Method**: POST
- **Description**: Creates or updates an alert for a market spread.
- **Arguments**:
  - `marketId` (required, string): The ID of the market.
  - `spread` (required, number): The spread value to alert on.
- **Responses**:
  - **201 Created**: Alert created or updated successfully.
    ```json
    {
      "message": "Alert created successfully"
    }
    ```
  - **500 Internal Server Error**: Unexpected server error.

### 9. Get Spread Alerts
- **Route**: `/api/alert/spread`
- **Method**: GET
- **Description**: Retrieves all spread alerts.
- **Arguments**: None
- **Responses**:
  - **200 OK**: Returns a list of all spread alerts.
    ```json
    [
      {
        "marketId": "market_id",
        "spread": 0.01
      },
      ...
    ]
    ```
  - **500 Internal Server Error**: Unexpected server error.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
