
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux

## Description

Nest DDD and CQRS boilerplate

## Preparation
### Add postgres docker container
```bash
$ docker run --name postgres -p5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_DB=payform -e POSTGRES_USER=root -d postgres:11.5
$ docker run -d --hostname rabbitmq --name rabbitmq -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_USER=root -e RABBITMQ_DEFAULT_PASS=root rabbitmq:3-management
```

```bash
To use nestjs CLI run: $ npm i -g @nestjs/cli
To use typeorm CLI run: $ npm i -g typeorm
```
## Installation

```bash
$ npm install
$ npm run typeorm:run
```

## Debug
[Example](https://github.com/nestjs/nest/issues/993#issuecomment-461189430) 
##### WebStorm
```
1) Click on 'Add Configuration' on top bar
2) Click '+' and select 'Attach to Node.js/Chrome'
3) Name it whatever you want
4) In 'Before script' area click '+' and select 'run npm script' and select run start:debug
5) Save and run in a debug mode 
```

## Migrations
The project uses [TypeOrm](https://typeorm.io)\
[Docs about migration](https://typeorm.io/#/migrations/) \
All migrations stored in the `/migrations` folder
```bash
Create new migration: $ typeorm migration:create -n InitUserTable
Run all unapplied migrations: $ npm run typeorm:run
Revert last migration: $ npm run typeorm:revert
Drop database. Be carefull, it could not be reverted: $ npm run typeorm:drop
```

## Module structure
// TODO 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Useful links
[RabbitMQ exchange types](https://lostechies.com/derekgreer/2012/03/28/rabbitmq-for-windows-exchange-types/) \
[Re-routing messages with delay in rabbitmq](https://medium.com/nmc-techblog/re-routing-messages-with-delay-in-rabbitmq-4a52185f5098)  
[RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html) \
[Package we use ti work with  rabbitmq](https://github.com/golevelup/nestjs/tree/master/packages/rabbitmq)
