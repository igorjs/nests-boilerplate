# NestJS Boilerplate

NestJS + Fastify + Prisma + PostgreSQL + Swagger REST API boilerplate.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running Docker](#running-docker)
- [Seeding the Database](#seeding-the-database)
- [Running the app](#running-the-app)
- [Testing](#testing)
- [Future Improvements](#future-improvements)

## Requirements

1. Docker Desktop (or similar) with support for docker-compose
2. NodeJS v20

## Commands

### Install Dependencies

```bash
$ npm install
```

### Running Docker

```bash
# docker full solution -> will install the app dependencies and run it in watch mode
$ docker compose up -d

# database only
$ docker compose up -d postgres
```

### Seeding the Database

```bash
$ npx prisma db seed
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Future Improvements

1. Improve API configurtion and security

   - Take leverage of the framework's builtin modules

   - Add [Helmet](https://docs.nestjs.com/security/helmet) security headers
   - Add [Cross-site request forgery](https://docs.nestjs.com/security/csrf) security
   - Add [Rate Limiting](https://docs.nestjs.com/security/rate-limiting)
   - Add [Cache](https://docs.nestjs.com/techniques/caching)
   - Add [Configuration](https://docs.nestjs.com/techniques/configuration)
   - Add [Healthchecks](https://docs.nestjs.com/recipes/terminus) (replace current hard-coded implementation)
   - Add [Documentation](https://docs.nestjs.com/recipes/documentation) for devs

   - Implement HTTPS
   - Implement [Authentication](https://docs.nestjs.com/security/authentication) and [Authorization](https://docs.nestjs.com/security/authorization) with [Auth Guards](https://docs.nestjs.com/guards#authorization-guard). Move them to an Auth module

   - Implement better [Exception Filters](https://docs.nestjs.com/exception-filters)

2. Database
   - Manage dotenv files per environment
   - Improve security of the database
