# Market API REST

Currently, this API is being redesigned to become an e-commerce. 29/07/21

Market API is an application that allows you to register users with email confirmation, users login, get profile, delete account, perform CRUD operations on products based on user roles, and get all products from other users.

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

## Routes and enpoints

### Auth

![auth](docs/images/auth.png)

### User

![User](docs/images/user.png)

### Products

![products](docs/images/products.png)

### Models

![models](docs/images/models.png)

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
