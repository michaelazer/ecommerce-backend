# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

### Test

In order to run the tests on this project run `npm run test`

### Run

In order to run the project on this project 
- if it is your first time to run it build the tables forst using `db-migrate up -c 4`
- run `npm run start`

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