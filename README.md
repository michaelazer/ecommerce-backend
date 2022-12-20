# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

### Installation

- Install all dependencies using `npm install`
- Create .env file in the project folder and include the following in it
```
POSTGRES_HOST=*.*.*.*
POSTGRES_DB=******
POSTGRES_TEST_DB=******
POSTGRES_USER=******
POSTGRES_PASSWORD=******
ENV=dev
TOKEN_SECRET=******
BCRYPT_PASSWORD=******
SALT_ROUNDS=***
```
- create a user using `psql -U POSTGRES_USER -W POSTGRES_PASSWORD`
- Create the database using `CREATE DATBASE POSTGRES_DB;`
- Build the tables using `dm-migrate up -c 4`

### Test

In order to run the tests on this project run `npm run test`

### Run

In order to run the project on this project 
- if it is your first time to run it build the tables forst using `db-migrate up -c 4`
- run `npm run start`
- the database will be running on port **5432**, while the server will run on port **3000**

## Required Technologies
The application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## End Points

### Users
- index: `/users [GET]`
- show: `/users/:id [GET]`
- create: `/users [POST]`
- delte: `/users [DELETE]`

### Products
- index: `/products [GET]`
- show: `/products/:id [GET]`
- create: `/products [POST]`
- delete: `/products [DELETE]`

### Orders
- index: `/orders [GET]`
- show: `/orders/:id [GET]`
- create: `/orders [POST]`
- addProduct: `/orders/:id/products [POST]`
- destroy: `/orders [DELETE]`