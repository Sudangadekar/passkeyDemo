const express = require('express');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post('/options', loginController.generateOptions);

router.post('/verify', loginController.verifyLogin);

module.exports = router;