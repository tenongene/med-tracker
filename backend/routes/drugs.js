const express = require('express');
require('dotenv').config();
const { randomInt } = require('node:crypto');

const router = express.Router();
const id = randomInt(1000000);
const { DynamoDBClient, PutItemCommand, UpdateItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');

//define environment variables
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;

// Create the DynamoDB service object
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});

//GET all meds
router.get('/', (req, res) => {
	res.json({ message: 'GET Medlist......' });
});

//GET a single med
router.get('/:id', (req, res) => {
	const item = new GetItemCommand({
		TableName: TABLE_NAME,
		Key: { id: { N: req.params.id } },
	});

	client
		.send(item)
		.then((response) => {
			res.status(200).json(response.Item);
			console.log(response.Item);
		})
		.catch((err) => {
			res.status(500).send(err.message);
			console.log(err.message);
		});
});

//POST a new med
router.post('/', (req, res) => {
	const { directions, refillsLeft, drugStrength, strengthUnit, drugInfo, drugName } = req.body;
	const drugModel = {
		TableName: process.env.TABLE_NAME,
		Item: {
			directions: {
				S: `${directions}`,
			},
			refillsLeft: {
				N: `${refillsLeft}`,
			},
			drugStrength: {
				N: `${drugStrength}`,
			},
			strengthUnit: {
				S: `${strengthUnit}`,
			},
			drugInfo: {
				S: `${drugInfo}`,
			},
			drugName: {
				S: `${drugName}`,
			},
			id: {
				N: `${id}`,
			},
		},
	};

	const drugItem = new PutItemCommand(drugModel);
	client
		.send(drugItem)
		.then((response) => {
			res.status(200).json(response);
			console.log(response);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
			console.log(err.message);
		});
});

//DELETE a single med
router.delete('/:id', (req, res) => {
	res.json({ message: 'DELETE a drug' });
});

//UPDATE a single med
router.patch('/:id', (req, res) => {
	res.json({ message: 'Edit a drug' });
});

///export routes
module.exports = router;
