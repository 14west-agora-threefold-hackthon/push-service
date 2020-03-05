const chai = require('chai');

const { expect } = chai;
const routes = require('../../../../api/');

describe('API Routes ', function() {
  it('should retrieve routes', function() {
    expect(routes).to.be.a('function');
  });
});
