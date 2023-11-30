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
	try {
		const salt = await bcrypt.genSalt(15);
		console.log(password, salt);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (err) {
		console.log(err.message);
	}
};

//database client
const { DynamoDBClient, PutItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');

//
//randomid generator for userId
const id = () => {
	return randomInt(1000000);
};

//env variables
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_GSI = process.env.TABLE_GSI;
const TABLE_NAME = process.env.TABLE_NAME;
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});

// login user
const loginUser = (req, res) => {
	const { email, password } = req.body;
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

	try {
		if (!email || !password) {
			throw Error('All fields must be filled');
		}

		client
			.send(user)
			.then((response) => {
				console.log(response.Items[0].drugList.L);
				if (response.Items.length === 0) {
					throw Error('No user found with that email!');
				}

				//bcrypt authentication
				bcrypt.compare(password, response.Items[0].password.S).then((result) => {
					const token = createToken(response.Items[0].password.S);
					result
						? res.status(200).json({
								// response,
								msg: 'User logged in successfully',
								token,
								user: response.Items[0].firstName.S,
								id: response.Items[0].id.N,
								email,
								drugList: response.Items[0].drugList.L,
						  })
						: res.status(403).json({ msg: 'Login Failed! Invalid password!' });
				});
			})
			.catch((err) => {
				res.status(403).json({ error: err.message });
			});
		//
	} catch (err) {
		console.log(err.message);
		res.status(404).json({ error: err.message });
	}
};

//

//getuser
const getUser = (req, res) => {
	const user = new QueryCommand({
		TableName: TABLE_NAME,
		IndexName: TABLE_GSI,
		KeyConditionExpression: 'id = :idvalue',
		ExpressionAttributeValues: {
			':idvalue': { N: `${req.params.id}` },
		},
		ProjectionExpression: 'drugList, email',
	});

	client
		.send(user)
		.then((response) => {
			res.status(200).json(response.Items);
			console.log(response);
		})
		.catch((err) => {
			res.status(404).json({ error: err.message });
			console.log(err.message);
		});
};

//

// signup user
const signupUser = async (req, res) => {
	const { email, password, firstName } = req.body;
	const jwtoken = createToken({ password });
	const h_pass = await hashPass(password);
	const userModel = {
		TableName: TABLE_NAME,
		Item: {
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

		const newUser = new PutItemCommand(userModel);
		client
			.send(newUser)
			.then((response) => {
				//
				//TODO: implement check against DB to make sure email doesn't already exist
				res.status(201).json({ msg: 'User created successfully', email, password: h_pass, jwtoken });
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

module.exports = { signupUser, loginUser, getUser };
