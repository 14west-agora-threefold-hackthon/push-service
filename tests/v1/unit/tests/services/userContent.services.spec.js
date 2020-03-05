const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sandbox = sinon.createSandbox();
const services = require('../../../../../api/v1/services');
const db = require('../../../../../api/v1/db');

const { userContentService } = services;

describe('UserContent Service', function() {
  describe('Create', function() {
    beforeEach(function() {
      sandbox.stub(db, 'create');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should create UserContent', async function() {
      const req = {
        affiliate: '1234567890',
        databaseConnection: 'receeipt1234567890'
      };

      db.create.returns(Promise.resolve({ _id: 123123123 }));
      await expect(userContentService.create(req, { user: 'blah' }, { content: 'blah' })).to.be
        .fulfilled;

      expect(db.create.calledOnce).to.be.true;
    });

    it('should create UserContent if exception occurs', async function() {
      db.create.throws();
      await expect(userContentService.create()).to.be.rejected;
    });
  });

  describe('Find', function() {
    beforeEach(function() {
      sandbox.stub(db, 'find');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should find UserContent', async function() {
      const req = {
        params: { id: '1234567890' }
      };

      db.find.returns(Promise.resolve({ _id: 123123123 }));
      await expect(userContentService.find(req, req.params.id)).to.be.fulfilled;

      expect(db.find.calledOnce).to.be.true;
    });

    it('should find UserContent if exception occurs', async function() {
      db.find.throws();
      await expect(userContentService.find()).to.be.rejected;
    });
  });
});
