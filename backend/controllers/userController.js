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
const TABLE_NAME2 = process.env.TABLE_NAME;
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});

// login user
const loginUser = (req, res) => {
	res.send({ msg: 'User logged in!' });
	// const user = new GetItemCommand({
	// 	TableName: TABLE_NAME2,
	// 	Key: { email: { S: req.params.email } },
	// });

	// client
	// 	.send(user)
	// 	.then((response) => {
	// 		res.status(200).json(response.Item);
	// 		console.log(response.Item);
	// 	})
	// 	.catch((err) => {
	// 		res.status(404).json({ error: err.message });
	// 		console.log(err.message);
	// });
};

// signup user
const signupUser = (req, res) => {
	res.send({ msg: 'User signed up!' });
	// const { userName, email, password, firstName } = req.body;
	// const userModel = {
	// 	TableName: TABLE_NAME2,
	// 	Item: {
	// 		userName: {
	// 			S: `${userName}`,
	// 		},
	// 		password: `${password}`,
	// 		email: `${email}`,
	// 		firstName: `${firstName}`,
	// 		id: {
	// 			N: `${id()}`,
	// 		},
	// 	},
	// };
	// const newUser = new PutItemCommand(userModel);
	// client
	// 	.send(newUser)
	// 	.then((response) => {
	// 		res.status(200).json(response);
	// 		console.log(response);
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).json({ error: err.message });
	// 		console.log(err.message);
	// 	});
};

module.exports = { signupUser, loginUser };
