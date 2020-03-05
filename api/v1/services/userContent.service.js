const db = require('../db');

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the postDb, add them to this service
 */
/**
 *
 * @param {*} req
 * @param {*} user
 * @param {*} content
 */
const create = async (req, user, content) => {
  try {
    return await db.create(req.databaseConnection, user, content);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  create
};
