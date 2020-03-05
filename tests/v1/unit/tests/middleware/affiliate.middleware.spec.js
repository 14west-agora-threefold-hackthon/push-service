const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { mockReq, mockRes } = require('sinon-express-mock');

const { expect } = chai;
chai.use(chaiAsPromised);

const affiliate = require('../../../../../api/v1/middleware/affiliate.middleware');
const db = require('../../../../../config/db');

console.log(db);

describe('affiliation middleware', function() {
  let connectStub;
  let fakeNext;

  describe('affiliate', function() {
    beforeEach(function() {
      connectStub = sinon.stub(db, 'connect');
      fakeNext = sinon.fake.returns(arg1 => {
        return arg1;
      });
    });

    afterEach(function() {
      connectStub.restore();
    });

    it('should attach req objects', async function() {
      // Set up http mocks
      const req = mockReq({});
      const res = mockRes();

      connectStub.returns(Promise.resolve({ connectionString: 'testAffilateDbConnection' }));
      await expect(affiliate()(req, res, fakeNext)).to.be.fulfilled;
      expect(connectStub.called).to.be.true;
    });

    it('should attach req objects if connection is invalid', async function() {
      const request = {
        headers: { 'x-affilate-name': 'testAffiliate' }
      };

      // Set up http mocks
      const req = mockReq(request);
      const res = mockRes();

      connectStub.returns(Promise.resolve(undefined));

      await expect(affiliate()(req, res, fakeNext)).to.be.fulfilled;
      expect(connectStub.calledOnce).to.be.true;
    });
  });
});
