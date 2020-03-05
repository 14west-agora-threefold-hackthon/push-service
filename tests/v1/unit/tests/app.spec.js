const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const { app } = require('../../../../app');

describe('App ', function() {
  it('should load app ', async function() {
    expect(app).to.not.be.null;
  });
});
