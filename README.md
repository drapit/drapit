
# Drapi

**WIP**

Are you tired of having to bootstrap projects from scratch? Most of the time Rest APIs have similar needs, Drapit is a template that have most common tools needed to build REST APIs.

## Architecture

This template is built using DDD concepts, as well as Onion Architecture and Hexagonal Architecture.

## Features

| Feature | Description | Implemented? |
|:--|:--|:--|
| API Versioning | Easily create controllers that respond to different versions (`/api/v1`, `/api/v2`...) of your public Rest API | Yes |
| Decorator Routing | Use decorators such as `@Controller('/people')`, `@Get('/')`, `@Get('/:id')`, `@Post('/')`, to route your endpoints | Yes |
| Decorator Swagger Documentation | @TODO | In Progress |
| Decorator Params Validation | @TODO | |
| Auto Generate Rest API Tests | @TODO | |
| Health Check Endpoint | @TODO | Yes |
| JWT Authentication | With Password, Client ID/Secrect and API_KEY support |  |
| Session Token Authentication | With Password, Client ID/Secrect and API_KEY support | |
| Websockets | @TODO | |
| Decorator Dependency Injection | @TODO | |
| Feature Toggling | @TODO | |
| Event/Listeners | @TODO | In Progress |
| File Uploading | @TODO | |
| History Recorder/Audit | @TODO | |
| Code Generation | @TODO | |
| Worker Queues | @TODO | |
| Locale Support | @TODO | |
| Auto Generate PlantUML for Domain Model | @TODO | |
| Multi Logger | User same interface (`Logger.info(...)`, `Logger.verbose(...)`, `Logger.error(...)`, etc) to log to multiple log aggregation providers and the console. | Yes |
 
## Tech Stack

| Tool | Description |
|--|--|
| [Node.js](https://nodejs.org/) | Development platform |
| [Typecript](https://www.typescriptlang.org/) | Programing language |
| [Express](https://expressjs.com/) | Web server |
| [ts-node](https://typestrong.org/ts-node/) | Development environment runner |
| [Nodemon](https://nodemon.io/) | Changes watcher |
| [Eslint](https://eslint.org/) | Code style enforcer |https://github.com/metadevpro/openapi3-ts
| [openapi3-ts](https://github.com/metadevpro/openapi3-ts) | OpenAPI/Swagger Spec Generator |
