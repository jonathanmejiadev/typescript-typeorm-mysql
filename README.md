# E-Commerce API REST

Build with: TypeScript, NodeJs, Express, TypeORM and MySQL.

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine.

### Installation 🔧

1. Clone the repo

```sh
git clone https://github.com/jonathanmejia-ar/typescript-typeorm-mysql.git
```

2. Install NPM packages

```sh
npm install
```

3. Read `env.example` and create a `.env` file with your environment variables.

### Run app 💻

- Start local server
  ```sh
  npm run dev
  ```

## Swagger API Documentation

Running by default in `http://localhost:3000/api-docs`

## Features 🎯

### 👥 As a Guest:

#### Products:

- See the complete list of products available to buy.
- See the complete list of products filtered by category.
- Search products by words.
- See a full product detail.

#### Account

- Register an account.
- Login an account.

### 🧑 As a Authenticated User

Can do everything a Guest does and also:

#### Account

- Delete current account.
- See profile account.

#### Orders

- See orders history.
- See a complete detail of the order.

#### Products

- Post a product review.

#### Cart

- Can add a product to the cart.
- Can remove a product from the cart.
- Can modify a quantity of product in the cart.

#### Checkout (To Implement)

- Buy the products from the cart.

### 🦸 As a Moderator

Can do everything a Auth User does and also:

#### Products

- Can create, edit and delete products.
- Can modify the stock of a product.
- Can add or remove a product from a category.

#### Categories

- Can create, edit and delete categories.

#### Orders

- Can see orders list.
- Can filter orders by status ( 'on_cart', 'created', 'processing', 'completed', 'cancelled' ).
- See a complete detail of the order.
- Can change the status of an order.

### 🧙‍♂️ As a Admin

Can do everything a moderator does and also:

#### Users

- Can make a user become an administrator.
- Can ban a user.

## Dependencies 🛠️

- [express](https://www.npmjs.com/package/express) - NodeJs Framework used for handling and routing HTTP requests.
- [typeorm](https://www.npmjs.com/package/typeorm) - TypeORM is an ORM library that allows us to interact with databases through functions without sql commands.
- [mysql](https://www.npmjs.com/package/mysql) - Relational database management system developed by Oracle.
- [passport](https://www.npmjs.com/package/passport) - Express-compatible authentication middleware for Node.js.
- [passport-jwt](https://www.npmjs.com/package/passport-jwt) - Passport strategy for authenticating with a JSON Web Token.
- [nodemailer](https://www.npmjs.com/package/nodemailer) - Send emails from Node
- [joi](https://www.npmjs.com/package/joi) - Powerful schema description language and data validator for JavaScript.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library to help you hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Open JSON-based standard proposed by IETF for token creations.
- [helmet](https://www.npmjs.com/package/helmet) - Helps you secure your Express apps by setting various HTTP headers.
- [http-errors](https://www.npmjs.com/package/@curveball/http-errors) - This package contains a list of standard HTTP exceptions for Typescript.
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) - reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - Allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file.

## Contact

If you want to contact me you can reach me at <jonathanmejia.ar@gmail.com>.
