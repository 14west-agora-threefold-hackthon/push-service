const v1routes = require('./v1/routes');

// New API versions may be added here... v2 v3 etc
module.exports = app => {
  app.use('/v1', v1routes);
};
