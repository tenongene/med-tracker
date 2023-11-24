require('dotenv').config();
const _ = require('lodash');
const { randomInt } = require('node:crypto');
const bcrypt = require('bcrypt');

//bccrypt hashing
const hashPass = async (password) => {
	const salt = await bcrypt.genSalt();
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

//database client
const {
	DynamoDBClient,
	PutItemCommand,
	ScanCommand,
	DeleteItemCommand,
	UpdateItemCommand,
	QueryCommand,
} = require('@aws-sdk/client-dynamodb');

const id = () => {
	return randomInt(1000000);
};

//env variables
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME2;
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});

// login user
const loginUser = (req, res) => {
	const { email } = req.body;
	console.log(email);
	const user = new QueryCommand({
		TableName: TABLE_NAME,
		KeyConditionExpression: 'email = :emailval',
		Select: 'ALL_ATTRIBUTES',
		ExpressionAttributeValues: {
			':emailval': {
				S: email,
			},
		},
	});

	client
		.send(user)
		.then((response) => {
			res.status(200).json(response.Items);
			console.log(response.Items);
		})
		.catch((err) => {
			res.status(404).json({ error: err.message });
			console.log(err.message);
		});
};

// signup user
const signupUser = (req, res) => {
	console.log(req.body);
	const { userName, email, password, firstName } = req.body;
	const userModel = {
		TableName: TABLE_NAME,
		Item: {
			userName: {
				S: `${userName}`,
			},
			password: {
				S: `${password}`,
			},
			email: {
				S: `${email}`,
			},
			firstName: {
				S: `${firstName}`,
			},
			id: {
				N: `${id()}`,
			},
		},
	};
	const newUser = new PutItemCommand(userModel);
	client
		.send(newUser)
		.then((response) => {
			res.status(200).json(response);
			console.log(response);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
			console.log(err);
		});
};

module.exports = { signupUser, loginUser };
