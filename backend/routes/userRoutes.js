const express = require('express');
require('dotenv').config();
const { signupUser, loginUser, getUser } = require('../controllers/userController');

const router = express.Router();

//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//unique user
router.get('/:id', getUser);

///
module.exports = router;
