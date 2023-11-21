require('dotenv').config();
const _ = require('lodash');
const { randomInt } = require('node:crypto');
const {
	DynamoDBClient,
	PutItemCommand,
	ScanCommand,
	DeleteItemCommand,
	UpdateItemCommand,
	GetItemCommand,
} = require('@aws-sdk/client-dynamodb');

const id = () => {
	return randomInt(1000000);
};

//env variables
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});

// get all drugs
const getMedList = (req, res) => {
	const medList = new ScanCommand({
		TableName: TABLE_NAME,
	});
	client
		.send(medList)
		.then((response) => {
			res.status(200).json(response.Items);
			console.log(response.Items);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
};

//  get a drug
const getDrug = (req, res) => {
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
			res.status(404).json({ error: err.message });
			console.log(err.message);
		});
};

// create new drug
const createDrug = (req, res) => {
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
				N: `${id()}`,
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
};

// delete a drug
const deleteDrug = (req, res) => {
	const item = new DeleteItemCommand({
		TableName: TABLE_NAME,
		Key: { id: { N: req.params.id } },
	});

	client
		.send(item)
		.then((response) => {
			res.status(200).json(response);
			console.log(response);
		})
		.catch((err) => {
			res.status(500).send(err.message);
			console.log(err.message);
		});
};

// update a drug
const updateDrug = (req, res) => {
	const { directions, refillsLeft, drugStrength, strengthUnit, drugInfo, drugName } = req.body;
	const item = new UpdateItemCommand({
		TableName: TABLE_NAME,
		Key: { id: { N: req.params.id } },
		UpdateExpression:
			'SET directions = :dir, refillsLeft = :rl, drugStrength = :ds, strengthUnit = :su, drugInfo = :di, drugName = :dn',
		ExpressionAttributeValues: {
			':dir': { S: directions },
			':rl': { N: refillsLeft },
			':ds': { N: drugStrength },
			':su': { S: strengthUnit },
			':di': { S: drugInfo },
			':dn': { S: drugName },
		},
		ReturnValues: 'UPDATED_NEW',
	});

	client
		.send(item)
		.then((response) => {
			res.status(200).json({ message: response });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};

module.exports = {
	createDrug,
	getDrug,
	getMedList,
	deleteDrug,
	updateDrug,
};
