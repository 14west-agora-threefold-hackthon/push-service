const util = require('util');
const { userContentModel } = require('./schema/userContent.schema');

/**
 *
 * @param {*} user
 * @param {*} content
 */
const create = async (dbConnection, user, content) => {
  try {
    /*
   * add code to call database here
   * this can be either an ORM model or code to invoke the database using a driver or querybuilder
   * i.e.-
    INSERT INTO userContent (user_details, content_details)
    VALUES (user, content);
  */
    console.debug(`user: ${util.inspect(user)} - content: ${util.inspect(content)}`);
    const model = await userContentModel(dbConnection);
    return await model.create({ user, content });
  } catch (error) {
    console.error(error.stack);
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} id
 */
const find = async (dbConnection, id) => {
  try {
    console.debug(`id: ${util.inspect(id)}`);
    const model = await userContentModel(dbConnection);
    return await model.findById(id);
  } catch (error) {
    console.error(error.stack);
    throw new Error(error.message);
  }
};

module.exports = {
  create,
  find
};
