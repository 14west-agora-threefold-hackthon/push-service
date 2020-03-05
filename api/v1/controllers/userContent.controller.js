const httpStatusCode = require('http-status-codes');
const utils = require('../utils');

const { mailer } = utils;

/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    // create user content
    const content = req.body;
    console.log('content::: ', content);
    // const userContent = await userContentService.create(req, content);
    // res.set('Location', `/v1/emails/${userContent._id.toString()}`);
    mailer.send(content);
    return res.sendStatus(httpStatusCode.CREATED);
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatusCode.BAD_REQUEST).send({ error: e.message });
  }
};

module.exports = {
  create
};
