# DDD Rest API

WIP

I just got tired of having to bootstrap projects from scratch. Most of the time Rest APIs have similar needs, so I decided to create a template that have most common tools needed in a REST API.

## Architecture

This template is built using DDD concepts, as well as Onion Architecture and Hexagonal Architecture.

## Features

- JWT and Session Token authentication.
- Feature toggling.
- Swagger annotations for Rest API documentation.
- History Recorder/Audit.
- Code generation.
- Worker queues (in memory, redis implementation, sqs implementation)
- Easily changeable third party tools.
