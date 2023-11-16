const express = require('express');
require('dotenv').config();
const { createDrug, getDrug, getMedList, deleteDrug, updateDrug } = require('../controllers/drugController');

const router = express.Router();

//GET all drugs
router.get('/', getMedList);

//GET a single drug
// router.get('/:id', getDrug);
router.get('/:id', getDrug);

//POST a new drug
router.post('/', createDrug);

//DELETE a single drug
router.delete('/:id', deleteDrug);

//UPDATE a single drug
router.patch('/:id', updateDrug);

///export routes
module.exports = router;
