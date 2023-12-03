const express = require('express');
require('dotenv').config();
const { signupUser, loginUser, getUser } = require('../controllers/userController');
const { createUserDrug, editUserDrug, deleteUserDrug } = require('../controllers/drugListController');

const router = express.Router();

//login route //App Entrypoint
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//unique user // from GSI
router.get('/:id', getUser);

//add drugs to a user
router.patch('/', createUserDrug);

//edit a user's drug
router.patch('/edit', editUserDrug);

//delete a user's drug
router.patch('/delete', deleteUserDrug);

//
module.exports = router;
