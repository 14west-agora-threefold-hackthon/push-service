const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { mockReq, mockRes } = require('sinon-express-mock');
const httpStatusCode = require('http-status-codes');
const randomstring = require('randomstring');

const sandbox = sinon.createSandbox();
const { expect } = chai;
chai.use(chaiAsPromised);
const { userContent } = require('../../../../../api/v1/controllers');
const services = require('../../../../../api/v1/services');

const { userContentService } = services;

describe('UserContent Controller', function() {
  describe('create', function() {
    let uname;
    let objectData;

    before(async function() {
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

    beforeEach(function() {
      sandbox.stub(userContentService, 'create');
      sandbox.stub(userContentService, 'find');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should create User Content', async function() {
      const request = {
        body: objectData
      };

      // Set up http mocks
      const req = mockReq(request);
      const res = mockRes();
      userContentService.create.returns(Promise.resolve({ _id: 123123123 }));

      await expect(userContent.create(req, res)).to.be.fulfilled;

      expect(userContentService.create.calledOnce).to.be.true;
      expect(res.sendStatus.calledOnce).to.be.true;
      expect(res.sendStatus.firstCall.args[0]).to.equal(httpStatusCode.CREATED);
    });

    it('should not crearte User Content if exception occurs', async function() {
      userContentService.create.throws();
      await expect(userContent.create()).to.be.rejected;
    });

    it('should find User Content by id', async function() {
      try {
        // Set up http mocks
        const req = mockReq({ params: { id: 12 } });
        const res = mockRes();
        userContentService.find.returns(
          Promise.resolve({
            user: {
              username: 'Ben',
              birthyear: 1988
            },
            content: {
              description: 'def description',
              title: 'def description'
            }
          })
        );

        await expect(userContent.find(req, res)).to.be.fulfilled;
        expect(userContentService.find.calledOnce).to.be.true;
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.firstCall.args[0]).to.equal(httpStatusCode.OK);
        expect(res.send.calledOnce).to.be.true;
      } catch (err) {
        console.error(err.message);
      }
    });

    it('should find User Content by id  - null response', async function() {
      const request = { params: { id: 222 } };
      // Set up http mocks
      const req = mockReq(request);
      const res = mockRes();

      userContentService.find.returns(Promise.resolve());

      await expect(userContent.find(req, res)).to.be.fulfilled;

      expect(userContentService.find.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(httpStatusCode.NOT_FOUND);
      expect(res.send.calledOnce).to.be.true;
    });

    it('should ind User Content by id', async function() {
      expect(userContent.find({})).to.eventually.be.rejected;
    });
  });
});
