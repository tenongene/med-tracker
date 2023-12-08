const express = require('express');
require('dotenv').config();
const { requireAuth, redirect } = require('../middleware/requireAuth');
const { signupUser, loginUser, getUser } = require('../controllers/userController');
const { createUserDrug, editUserDrug, deleteUserDrug } = require('../controllers/drugListController');

const router = express.Router();

//signup route
router.post('/signup', signupUser);

//login route //App Entrypoint
router.post('/login', loginUser);

//unique user // from GSI
router.use('/:id', requireAuth);
router.get('/:id', getUser);

//add drugs to a user
router.use('/add', requireAuth);
router.patch('/add', createUserDrug);

//edit a user's drug
router.use('/edit', requireAuth);
router.patch('/edit', editUserDrug);

//delete a user's drug
router.use('/delete', requireAuth);
router.patch('/delete', deleteUserDrug);

module.exports = router;
