const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Clippy",
      version: "1.0.0",
      description: "Clippy is a helpful swiss army knife for your questions.",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "Raf",
        url: "https://www.rafszuminski.com",
        email: "rafcin.s@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/pages/api/**/*.ts"], // Replace with the path to your API files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
