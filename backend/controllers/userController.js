require('dotenv').config();
const _ = require('lodash');
const validator = require('validator');
const { randomInt } = require('node:crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//
//JWT issue function
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXP });
};
//
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

//
//randomid generator for userId
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
const signupUser = async (req, res) => {
	const { userName, email, password, firstName } = req.body;
	const h_pass = await hashPass(password);
	const userModel = {
		TableName: TABLE_NAME,
		Item: {
			userName: {
				S: `${userName}`,
			},
			password: {
				S: `${h_pass}`,
			},
			email: {
				S: `${email}`,
			},
			firstName: {
				S: `${_.capitalize(firstName)}`,
			},
			id: {
				N: `${id()}`,
			},
		},
	};

	try {
		//validation
		if (!email || !password || !firstName || !userName) {
			throw Error('All fields must be filled');
		}

		if (!validator.isEmail(email)) {
			throw Error('Email must be a valid email');
		}

		if (!validator.isStrongPassword(password)) {
			throw Error('Password must be at least 6 characters in length and contain at least one special character');
		}

		const newUser = new PutItemCommand(userModel);
		// console.log(newUser.input.Item.password.S);
		console.log(h_pass);
		const token = createToken({ userName });
		//
		client
			.send(newUser)
			.then((response) => {
				res.status(200).json({ email, token });
				console.log(token);
			})
			//
			.catch((err) => {
				res.status(400).json({ error: err.message });
				// console.log(err);
			});
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = { signupUser, loginUser };
