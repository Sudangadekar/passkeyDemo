const express = require('express');
const registerController = require('../controllers/register.controller');

const router = express.Router();

router.post(
    '/options',
    registerController.generateOptions
);

router.post(
    '/verify',
    registerController.verifyRegistration
);

module.exports = router;