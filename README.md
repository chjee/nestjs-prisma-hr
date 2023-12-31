<h1 align="center">Welcome to nestjs-prisma-hr 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.17.1-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D9.6.7-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: UNLICENSED" src="https://img.shields.io/badge/License-UNLICENSED-yellow.svg" />
  </a>
</p>

> NestJS, Prisma, MySQL, Typescript를 이용한 REST API

## Prerequisites

- node >=18.17.1
- npm >=9.6.7

## Install

```sh
$ npm install
```

## Usage

```sh
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Other commands

```sh
# generate prisma client
$ npx prisma generate

# generate prisma migration
$ npx prisma migrate dev --name init

# reset prisma migration
$ npx prisma migrate reset

# execute database seed
$ npx prisma db seed --preview-feature
```

## .env configuration

```sh
DATABASE_URL="mysql://username:password@localhost:3306/hr?schema=public"
```

## Author

👤 **Changhoon Jee <chjee71@gmail.com>**

- Github: [@chjee](https://github.com/chjee)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
