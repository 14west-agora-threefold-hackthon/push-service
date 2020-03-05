const Joi = require('@hapi/joi');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { mockReq, mockRes } = require('sinon-express-mock');

const { expect } = chai;
chai.use(chaiAsPromised);
const sandbox = sinon.createSandbox();

chai.use(chaiAsPromised);

const validate = require('../../../../../api/v1/middleware/validate.middleware');

describe('Validate middleware', function() {
  let fakeNext;
  beforeEach(function() {
    sandbox.stub(Joi, 'validate');
    fakeNext = sinon.fake.returns(arg1 => {
      return arg1;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should validate params with no error, next()  ', async function() {
    // Set up http mocks
    const req = mockReq({ params: { id: 12 } });
    const res = mockRes();

    Joi.validate.returns(Promise.resolve({ error: null }));
    await expect(validate({ modelInstance: 'theModel' }, 'params')(req, res, fakeNext)).to.be
      .fulfilled;
    expect(Joi.validate.calledOnce).to.be.true;
    expect(fakeNext.calledOnce).to.be.true;
  });

  it('should validate body with no error, next()  ', async function() {
    // Set up http mocks
    const req = mockReq({ body: { id: 12 } });
    const res = mockRes();

    Joi.validate.returns(Promise.resolve({ error: null }));
    await expect(validate({ modelInstance: 'theModel' })(req, res, fakeNext)).to.be.fulfilled;
    expect(Joi.validate.calledOnce).to.be.true;
    expect(fakeNext.calledOnce).to.be.true;
  });

  it('should validate params and produce error, next()  ', async function() {
    // Set up http mocks
    const req = mockReq({ params: { id: 12 } });
    const res = mockRes();

    Joi.validate.returns(
      Promise.resolve({
        error: { details: [{ message: '16 char hex character string' }, { message: 'required' }] }
      })
    );
    await expect(validate({ modelInstance: 'theModel' }, 'params')(req, res, fakeNext)).to.be
      .fulfilled;
    expect(Joi.validate.calledOnce).to.be.true;
    expect(fakeNext.calledOnce).to.be.true;
  });

  it('should throw on params validate - without error messages, next(err) ', async function() {
    // Set up http mocks
    const req = mockReq({ params: { id: 12 } });
    const res = mockRes();

    Joi.validate.throws();
    await expect(validate({ modelInstance: 'theModel' }, 'params')(req, res, fakeNext)).to.be
      .fulfilled;
    expect(Joi.validate.calledOnce).to.be.true;
    expect(fakeNext.calledOnce).to.be.true;
  });

  it('should throw on params validate - with error messages, next(err) ', async function() {
    // Set up http mocks
    const req = mockReq({ params: { id: 12 } });
    const res = mockRes();

    Joi.validate.throws({ details: [{ message: 'message 1' }, { message: 'message 2' }] });
    await expect(validate({ modelInstance: 'theModel' }, 'params')(req, res, fakeNext)).to.be
      .fulfilled;
    expect(Joi.validate.calledOnce).to.be.true;
    expect(fakeNext.calledOnce).to.be.true;
  });
});
