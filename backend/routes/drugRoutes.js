const express = require('express');
require('dotenv').config();
const { createDrug, getDrug, getMedList, deleteDrug, updateDrug } = require('../controllers/drugController');

const router = express.Router();

//GET all meds
router.get('/', getMedList);

//GET a single med
// router.get('/:id', getDrug);
router.get(
	'/:id',
	getDrug
	// const item = new GetItemCommand({
	// 	TableName: TABLE_NAME,
	// 	Key: { id: { N: req.params.id } },
	// });

	// client
	// 	.send(item)
	// 	.then((response) => {
	// 		res.status(200).json(response.Item);
	// 		console.log(response.Item);
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).send(err.message);
	// 		console.log(err.message);
	// 	});
);

//POST a new med
// router.get('/', createDrug);
router.post(
	'/',
	createDrug
	// const { directions, refillsLeft, drugStrength, strengthUnit, drugInfo, drugName } = req.body;
	// const drugModel = {
	// 	TableName: process.env.TABLE_NAME,
	// 	Item: {
	// 		directions: {
	// 			S: `${directions}`,
	// 		},
	// 		refillsLeft: {
	// 			N: `${refillsLeft}`,
	// 		},
	// 		drugStrength: {
	// 			N: `${drugStrength}`,
	// 		},
	// 		strengthUnit: {
	// 			S: `${strengthUnit}`,
	// 		},
	// 		drugInfo: {
	// 			S: `${drugInfo}`,
	// 		},
	// 		drugName: {
	// 			S: `${drugName}`,
	// 		},
	// 		id: {
	// 			N: `${id}`,
	// 		},
	// 	},
	// };

	// const drugItem = new PutItemCommand(drugModel);
	// client
	// 	.send(drugItem)
	// 	.then((response) => {
	// 		res.status(200).json(response);
	// 		console.log(response);
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).json({ error: err.message });
	// 		console.log(err.message);
	// 	});
);

//DELETE a single med
router.delete('/:id', deleteDrug);

//UPDATE a single med
router.patch('/:id', updateDrug);

///export routes
module.exports = router;
