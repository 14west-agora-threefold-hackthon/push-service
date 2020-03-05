const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const userContent = require('../../../../../api/v1/db/userContent.db');
const MemDb = require('../../../../helpers/memDbServer');

const memDb = new MemDb();

describe('UserContent DAL', function() {
  describe('UserContent helpers  ', function() {
    it('should create userContent', async function() {
      const result = await userContent.create(memDb.affilateDbConnection, {}, {});
      expect(result).to.not.be.null;
      expect(result).to.not.be.empty;
    });

    it('should not create User Content if exception occurs', async function() {
      await expect(userContent.create({ test: 'badConnection' }, memDb.affiliateName)).to.be
        .rejected;
    });

    it('should find userContent by id', async function() {
      const result = await userContent.find(memDb.affilateDbConnection, '5d65a181bbdbde7d04435cfb');
      expect(result).to.be.null;
    });

    it('should not find userContent by id if exception occurs', async function() {
      await expect(userContent.find({ test: 'badConnection' }, memDb.affiliateName)).to.be.rejected;
    });
  });
});
