# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker desktop - [Download page](https://www.docker.com/products/docker-desktop/)

## Installation process

1.Clone the repository:
`git clone https://github.com/KuzmakD/nodejs2024Q3-service.git`
2.Install all npm modules `npm install`
3.Create the .env file using [example](.env.example);
4.Log in and launch the Docker Desktop application.

## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

To run the application with automatic restart use:

```
npm run start:dev
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
