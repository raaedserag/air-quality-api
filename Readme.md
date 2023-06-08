# Air Quality API
This is a simple API that provides air quality data for a given city. The API uses the [IQ Air Quality API](https://www.iqair.com/air-pollution-data-api) to get the air quality data.

## Features
- Get air quality data for a given city location (latitude and longitude)
- Record air quality data for Paris(48.864716, 2.349014) at an interval
- Get maximum air quality data info for Paris(48.864716, 2.349014)
## Pre-requisites
- Docker
- Make

## Tools
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [IQ Air Quality API](https://www.iqair.com/air-pollution-data-api)
- [Cron](https://www.npmjs.com/package/cron)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [Sinon](https://sinonjs.org/)
- [Docker](https://www.docker.com/)
## Environment configuration
Some of the application configuration settings is stored in the `config/` directory. replace the values in the `config/<environment>` file with needed values.
## Environment variables
This project uses the following environment variables:

| Name                          | Description                         | 
| ----------------------------- | ------------------------------------|
PORT                          | Port number for the server to listen on
HOST                        | Host name for the server to listen on
VERSION                    | Version of the API
LOGS_PATH                 | Path to the logs directory
NODE_ENV                  | Environment the server is running in
IQ_AIR_QUALITY_API_KEY   | API key for IQ Air Quality API
IQ_AIR_QUALITY_API_BASE_URL | Base URL for IQ Air Quality API
MONGO_DB_URI              | URI for MongoDB

It's recommended to use a `.env` file to set these variables. An example `.env` file is provided in the root of the project.
Make sure to enable `enableDotEnv` in `config/<environment>` to use the `.env` file.

# Getting Started
- Build the docker image
```bash
make build
```
- Run unit tests
```bash
make test
```
- Run the docker image
```bash
make run
```
- Stop the docker image
```bash
make stop
```
-  Navigate to `/api-docs` endpoint to view the swagger documentation


## Testing
The tests are  written in [Jest](https://jestjs.io/) with the help of [sinon](https://sinonjs.org/). A separate test database is used for testing. The test database is created and destroyed before and after each test respectively.

## API Documentation
The API documentation is generated using [Swagger](https://swagger.io/) with the help of [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).

You can view the API documentation by navigating to the `/api-docs` endpoint.

