const express = require('express');
const asyncHandler = require('express-async-handler');
const { userContent } = require('../controllers');
const validate = require('../middleware/validate.middleware');
const affiliation = require('../middleware/affiliate.middleware');
const { emailCreate } = require('../validation/userContent.validation');

const router = express.Router();

// Apply affiliate middleware to router
router.use(asyncHandler(affiliation()));

router.post('/emails', asyncHandler(validate(emailCreate)), asyncHandler(userContent.create));

module.exports = router;
