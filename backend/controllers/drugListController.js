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
	const { drugIndex, email, updatedDrug } = req.body;
	console.log(drugIndex, email, updatedDrug);

	try {
		const response = await ddb.send(
			new UpdateCommand({
				TableName: TABLE_NAME,
				Key: { email: email },
				UpdateExpression: `SET drugList[${drugIndex}] = :updated_drug`,
				ExpressionAttributeValues: {
					':updated_drug': updatedDrug,
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

//delete user drug
const deleteUserDrug = async (req, res) => {
	const { drugIndex, email } = req.body;
	console.log(drugIndex, email);

	try {
		const response = await ddb.send(
			new UpdateCommand({
				TableName: TABLE_NAME,
				Key: { email: email },
				UpdateExpression: `REMOVE drugList[${drugIndex}]`,
				// ExpressionAttributeValues: {
				// 	':newlist': newList,
				// },
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
