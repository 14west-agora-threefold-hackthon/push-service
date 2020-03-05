const { conf } = require('../../../config/env');
const db = require('../../../config/db');

module.exports = () => {
  return async (req, res, next) => {
    try {
      const testDbConnection = await db.connect(conf.store.MONGODB_CONNECTION_DB);
      if (testDbConnection) {
        req.affilateDbConnection = conf.store.MONGODB_CONNECTION_DB;
        req.databaseConnection = testDbConnection;
        next();
      } else {
        throw new Error(`Invlaid DB Connection - ${conf.store.MONGODB_CONNECTION_DB}`);
      }
    } catch (error) {
      next(new Error(`DB Connection error - ${error.message}`));
    }
  };
};
