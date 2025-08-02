const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/userController');
const protect = require('../middleware/auth');

router.get('/me', protect, getUserProfile);

module.exports = router;
