# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
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

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- email
- password

#### Orders
- id
- user_id
- status

### Order-Products
- id
- order_id
- product_id
- quantity

