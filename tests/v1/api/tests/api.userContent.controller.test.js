const request = require('supertest');
const httpStatusCode = require('http-status-codes');
const randomstring = require('randomstring');
const assert = require('assert');
const { expect } = require('chai');
const { app } = require('../../../../app');

const MemDb = require('../../../helpers/memDbServer');

const memDb = new MemDb();

describe('usercontent API', function() {
  let uname;
  let objectData;
  let resourceUri;

  before(async function() {
    console.debug('Using memDb.affiliateName ::: ', memDb.affiliateName);
    uname = randomstring
      .generate({
        length: 20,
        charset: 'alphabetic'
      })
      .toString();
    objectData = {
      user: {
        username: uname,
        birthyear: 1994
      },
      content: {
        description: 'abc2description',
        title: 'abc description'
      }
    };
  });

  it('respond with json create an object', async function() {
    const createUserContent = request(app)
      .post('/v1/usercontents')
      .send(objectData)
      .set('Accept', 'application/json');

    const response = await createUserContent;
    assert.equal(response.statusCode, httpStatusCode.CREATED);
    expect(response.headers).to.exist;
    expect(response.headers.location).to.exist;
    expect(response.headers.location).to.be.a('string');
    resourceUri = response.headers.location;
  });

  it('return resource by id', async function() {
    const getUserContent = request(app)
      .get(resourceUri)
      .set('Accept', 'application/json');

    const response = await getUserContent;
    assert.equal(response.statusCode, httpStatusCode.OK);
    expect(response.body.user.username).to.exist;
  });
});
