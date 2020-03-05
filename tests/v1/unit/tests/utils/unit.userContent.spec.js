const assert = require('assert');
const utils = require('../../../../../api/v1/utils');

const { userContentUtil } = utils;

describe('utils', function() {
  describe('utils.userContent', function() {
    it('keeps singular when count is 1', function() {
      assert.strictEqual(userContentUtil.userContent(1, 'cat'), '1 cat');
    });

    it('keeps plural when count is > 1', function() {
      assert.strictEqual(userContentUtil.userContent(2, 'cat'), '2 cats');
    });
  });
});
