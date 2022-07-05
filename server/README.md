# Node Typescript Starter Server

Author: Izak Blom

- [Node Typescript Starter Server](#node-typescript-starter-server)
  - [Development](#development)
    - [Environment configuration](#environment-configuration)
    - [Testing](#testing)
  - [Linting and Formatting](#linting-and-formatting)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
  - [API Documentation](#api-documentation)
  - [Libraries and Frameworks](#libraries-and-frameworks)

## Development

1. Ensure node and npm are installed on the local development environment <https://nodejs.org/en/download/>
2. `npm install`
3. `npm run dev`
4. Once the app has compiled and is running in the local terminal, navigate to <http://localhost:3000> in a browser window to view the running backend app's swagger documentation and to test the available endpoints

### Environment configuration

Environment variables are provided in [.env](./.env). Ideally this file should be excluded from source control and the [example.env](./example.env) file shoud be used as a template to configure the environment variables.

The .env files is parsed by using the [dotenv](https://www.npmjs.com/package/dotenv) npm package. If the variables are set in the runtime environment, these will have preference over anything specified in .env

### Testing

Unit tests are implemented in [./**tests**](./tests) using the [Jest framework](https://jestjs.io/).

These tests can be run in the development environment with `npm test`.

The endpoints provided by the API service are tested in integration style through the [supertest](https://www.npmjs.com/package/supertest) npm package which provides http assertions.

## Linting and Formatting

### ESLint

[eslint](https://www.npmjs.com/package/eslint) npm package allows linting of Javascript. Linting of Typescript is made possible with the plugins `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`.

Rules are specified in [.eslintrc.json](./.eslintrc.json)

### Prettier

[prettier](https://www.npmjs.com/package/prettier) is used for automatic formatting. Rules are specified in [prettierrc.json](./prettierrc.json)

## API Documentation

The API is documented with [Swagger](https://swagger.io/).

The complete interactive documentation can be viewed through a browser by visiting the default server address (<http://localhost:3000>)

This Swagger documentation includes:

- All available API endpoints
- Descriptions for endpoint usage, responses and requests
- Example API requests and formats
- API Response schema definitions and formats
- API Response examples
- User interfaces to test each live API endpoint with custom input

The [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) npm package enables serving the Swagger interface as part of the Express web server application.

The [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) npm package allows declaring swagger specifications as inline code JSDoc comments by using the `@swagger` JSDoc annotation. This ensures the swagger specification remains up to date, provided the code comments are kept up to date as the implementation changes.

## Libraries and Frameworks

1. [NodeJS](https://nodejs.org/en/)
   Node allows running Javascript in the cross-platform Node runtime environment with high availibility due to asynchronous event loops and callbacks. The [npm](https://www.npmjs.com/) package manager provides package management for NodeJs projects
2. [Typescript](https://www.npmjs.com/package/typescript) Type features for Javascript
3. [Express framework](https://expressjs.com/) for Node
   Minimalist framework for developing API services providing features such as middleware, request validation and routing.
4. [pg](https://www.npmjs.com/package/pg) npm package provides Postgresql integration for Node applications
5. [pg-migrations](https://www.npmjs.com/package/pg-migrations) Automatic migrations for Postgresql databases
6. [cors](https://www.npmjs.com/package/cors) provides Cross origin request middleware for Node Express applications.
7. [dotenv](https://www.npmjs.com/package/dotenv) npm package provides loading of environment variables into the running Node process and allows specification of variables in separate .env files which can be excluded from source control if some variables contain sensitive information. Also prevents "hard-coding" environment variables.
8. [express-validator](https://www.npmjs.com/package/express-validator) npm package provides enhanced Express API request validation middleware.
9. [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) npm package provides inline JSDoc Swagger specifications (with `@swagger` annotations) which enhances the maintainability of Swagger documentation as code comments.
10. [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) npm package allows serving a Swagger UI as part of an Express application.
11. Typescript provided by [typescript](https://www.npmjs.com/package/typescript) package allows the usage of Typescript which can be compiled to Javascript. Typescript allows type-safety and various language features not provided by normal Javascript.
12. [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) npm package allows realtime transpile and running of typescript Node projects
13. Jest framework for unit testing provided through [jest](https://www.npmjs.com/package/jest) npm package.
14. [supertest](https://www.npmjs.com/package/supertest) npm package allows HTTP assertions in Unit test implementations for NodeJS allowing API endpoint unit testing.
15. [joi](https://www.npmjs.com/package/joi) Powerful validation library
16. [jest](https://www.npmjs.com/package/jest) Unit test framework
17. [ts-jest]((https://www.npmjs.com/package/ts-jest) Jest unit testing for Typescript
