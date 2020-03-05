const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const parser = require('parse-mongo-url');
const { conf } = require('../../config/env');
const { connect } = require('../../config/db');

/**
 *  In memory mongodb server singleton
 */
class MemDb {
  constructor(affiliateName = 'testAffiliate') {
    if (MemDb.instance) {
      return MemDb.instance;
    }
    this.server = new MongoMemoryServer({
      debug: !conf.store.IS_PRODUCTION
    });
    this.connections = null;
    this.affilateDbConnection = null;
    this.affiliateClientModel = null;
    this.affiliateName = affiliateName;

    MemDb.instance = this;
    return this;
  }

  /**
   * Start the server and establish a connection
   */
  async start() {
    console.log('::: start MemDb :::');
    const mongoUri = await this.server.getConnectionString();

    // override conf env vars applying MongoMemoryServer mongoUri
    const parsedMongoUri = await parser(mongoUri);
    conf.set('MONGODB_SERVICE_HOST', parsedMongoUri.servers[0].host);
    conf.set('MONGODB_SERVICE_PORT', parsedMongoUri.servers[0].port);
    this.affilateDbConnection = await connect(conf.store.AFFILIATE_DATABASE);
    this.connections = mongoose.connections;
    const dbName = await this.server.getDbName();
    console.debug('MongoMemoryServer database: ', dbName);
  }

  /**
   *  Disconnect mongoose and stop the server
   */
  async stop() {
    console.log('::: stop MemDb :::');
    await mongoose.disconnect();
    await this.server.stop();
  }

  /**
   *  Clear cached connections and Close all connections
   */
  async cleanup() {
    console.log('::: cleanup MemDb :::');
    const closeAllConnections = this.connections.map(async function closeConnections(conn) {
      if (conn.db) console.log(`Closing connection: ${conn.db.databaseName}`);
      await conn.close();
    });
    await Promise.all(closeAllConnections);
  }
}

module.exports = MemDb;
