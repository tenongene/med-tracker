require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET;
const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;
const client = new DynamoDBClient({
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET,
});
const ddb = DynamoDBDocumentClient.from(client);

//Add a drug to user
const createUserDrug = async (req, res) => {
	console.log(req.body);
	const { newDrug, email } = req.body;

	try {
		const response = await ddb.send(
			new UpdateCommand({
				TableName: TABLE_NAME,
				Key: { email: email },
				UpdateExpression: 'SET drugList = list_append(:newdrug, drugList)',
				ExpressionAttributeValues: {
					':newdrug': newDrug,
				},
				ReturnValues: 'ALL_NEW',
			})
		);

		console.log(response);
		return response;
		//
	} catch (error) {
		console.log(error.message);
	}
};

//TODO
//edit user drug
const editUserDrug = async (req, res) => {
	console.log(req.body);
	const { updatedDrug, email } = req.body;

	const response = await ddb.send(
		new UpdateCommand({
			TableName: TABLE_NAME,
			Key: { email: email },
			UpdateExpression: 'SET drugList = list_append(:updatedrug, drugList)',
			ExpressionAttributeValues: {
				':updatedrug': updatedDrug,
			},
			ReturnValues: 'ALL_NEW',
		})
	);

	console.log(response);
	return response;
};

//TODO
//delete user drug
const deleteUserDrug = async (req, res) => {
	console.log(req.body);
	const { newList, email } = req.body;
	console.log(newList);

	try {
		const response = await ddb.send(
			new UpdateCommand({
				TableName: TABLE_NAME,
				Key: { email: email },
				UpdateExpression: 'SET drugList = :newlist',
				ExpressionAttributeValues: {
					':newlist': newList,
				},
				ReturnValues: 'ALL_NEW',
			})
		);

		console.log(response);
		return response;
		//
	} catch (error) {
		console.log(error.message);
	}
};

//
module.exports = { createUserDrug, editUserDrug, deleteUserDrug };
