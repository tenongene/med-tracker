require('dotenv').config();
const _ = require('lodash');
const validator = require('validator');
const { randomInt } = require('node:crypto');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//env variables
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_GSI = process.env.TABLE_GSI;
const TABLE_NAME = process.env.TABLE_NAME;

//database client
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});
const ddb = DynamoDBDocumentClient.from(client);

//
//JWT issue function
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXP });
};

const hashPass = async (password) => {
	try {
		const salt = await bcrypt.genSalt(15);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (err) {
		console.log(err.message);
	}
};

//
//randomid generator for userId
const id = () => {
	return randomInt(1000000);
};

// login user // App Entrypoint
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const response = await ddb.send(
			new QueryCommand({
				TableName: TABLE_NAME,
				KeyConditionExpression: 'email = :emailval',
				Select: 'ALL_ATTRIBUTES',
				ExpressionAttributeValues: {
					':emailval': email,
				},
			})
		);

		if (!email || !password) {
			throw Error('All fields must be filled');
		}

		if (response.Items.length === 0) {
			throw Error('No user found with that email!');
		}

		//bcrypt authentication
		bcrypt.compare(password, response.Items[0].password).then((result) => {
			const accessToken = createToken({ user: response.Items[0].firstName, id: response.Items[0].id });

			result
				? res.status(200).json({
						// response,
						msg: 'User logged in successfully',
						accessToken,
						user: response.Items[0].firstName,
						id: response.Items[0].id,
						drugList: response.Items[0].drugList,
				  })
				: res.status(403).json({ msg: 'Login Failed! Invalid password!' });
			// console.log(response);
		});
	} catch (err) {
		console.log(err.message);
		res.status(404).json({ error: err.message });

		//
	}
};

//

//getuser //from GSI
const getUser = async (req, res) => {
	try {
		const response = await ddb.send(
			new QueryCommand({
				TableName: TABLE_NAME,
				IndexName: TABLE_GSI,
				KeyConditionExpression: 'id = :idvalue',
				ExpressionAttributeValues: {
					':idvalue': `${req.params.id}`,
				},

				ProjectionExpression: 'drugList',
			})
		);
		console.log(response);
		res.status(200).json(response);
		return response;
	} catch (err) {
		res.status(403).json({ error: err.message });
		console.log(err.message);
	}
};

//

// signup user
const signupUser = async (req, res) => {
	const { email, password, firstName } = req.body;
	const jwtoken = createToken({ password });
	const h_pass = await hashPass(password);
	const userModel = {
		TableName: TABLE_NAME,
		ConditionExpression: 'attribute_not_exists(email)',
		Item: {
			password: `${h_pass}`,
			email: `${email}`,
			firstName: `${_.capitalize(firstName)}`,
			id: `${id()}`,
			drugList: [],
		},
	};

	try {
		// field validation
		if (!email || !password || !firstName) {
			throw Error('All fields must be filled');
		}

		if (!validator.isEmail(email)) {
			throw Error('Email must be a valid email');
		}

		if (!validator.isStrongPassword(password)) {
			throw Error('Password must be at least 6 characters in length and contain at least one special character');
		}

		const response = await ddb.send(new PutCommand(userModel));
		console.log(response);

		res.status(201).json({ msg: 'User created successfully', email, password: h_pass, jwtoken });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = {
	loginUser,
	getUser,
	signupUser,
};
