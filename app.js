/* istanbul ignore file */
// Core Modules
const express = require('express');
const bodyParser = require('body-parser');

// Security Modules
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const contentLength = require('express-content-length-validator');

// Other Modules
const figlet = require('figlet');
const httpStatusCode = require('http-status-codes');

// Swagger Modules
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger');

// Configuration Settings
const { conf } = require('./config/env');
const moduleName = require('./package.json').name;

// Application Services
const app = express();
app.enable('trust proxy');

swaggerDefinition.host = `${conf.store.APPLICATION_SERVICE_HOST}:${conf.store.APPLICATION_SERVICE_PORT}`;
const options = {
  swaggerDefinition,
  apis: ['./api/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Security Middleware
app.use(helmet());
app.use(hpp());
app.use(contentLength.validateMax({ max: conf.store.maxContentLengthAccepted }));
app.use(cors());

// Custom Middleware Initialization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  api routers
require('./api')(app);

app.use((err, req, res, next) => {
  console.log(next);
  console.error(err.stack);
  res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(`Error: ${err.message}`);
});

if (!module.parent) {
  console.log(
    figlet.textSync(moduleName, {
      font: 'Doom'
    })
  );
  app.listen(conf.store.APPLICATION_SERVICE_PORT, conf.store.APPLICATION_SERVICE_HOST, () => {
    console.log(
      `Listening on: ${conf.store.APPLICATION_SERVICE_PORT}, at ${conf.store.APPLICATION_SERVICE_HOST}`
    );
  });
}
module.exports = { app };
