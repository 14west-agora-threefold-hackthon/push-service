/* istanbul ignore file */
const mongoose = require('mongoose');
const { conf } = require('../env');

/**
 *
 * @param {*} databaseName name of the database connecting to, defaults to conf setting
 */
const initiateConnection = async (databaseName = conf.store.MONGODB_CONNECTION_DB) => {
  // Default for local development
  const userPassword =
    conf.store.MONGODB_AFFILIATE_USER && conf.store.MONGODB_AFFILIATE_PASSWORD
      ? `${conf.store.MONGODB_AFFILIATE_USER}:${conf.store.MONGODB_AFFILIATE_PASSWORD}@`
      : '';
  const mongodbConnectionString = `mongodb://${userPassword}${conf.store.MONGODB_SERVICE_HOST}:${conf.store.MONGODB_SERVICE_PORT}/${databaseName}`;
  try {
    console.debug('mongodbConnectionString:', mongodbConnectionString);
    const opts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoReconnect: true
    };
    // Create mongoose connection
    const connection = await mongoose.createConnection(`${mongodbConnectionString}`, opts);
    // Mongoose connection handlers
    connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    connection.on(
      'connected',
      console.debug.bind(console, `Successfully connected to database: ${databaseName}.`)
    );
    connection.on(
      'disconnected',
      console.debug.bind(console, `Successfully disconnected database: ${databaseName}.`)
    );

    process.on('SIGINT', async () => {
      /**
       *  database connection closer utility
       * @param {*} conn
       */
      const closeConnections = async conn => {
        await conn.close(() => {
          console.log(
            `Mongoose connection: ${mongodbConnectionString} disconnected due to application termination`
          );
        });
      };
      await mongoose.connections.map(closeConnections);
      // Now that all open connections have been closed exit process
      process.exit(0);
    });
    return connection;
  } catch (error) {
    console.error(`connection error: ${error.message}`);
    return new Error(error.message);
  }
};

module.exports = {
  initiateConnection
};
