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

//Add  user drug
const createUserDrug = async (req, res) => {
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

		res.status(200).json({ response });

		//
	} catch (error) {
		console.log(error.message);
	}
};

//Edit user drug
const editUserDrug = async (req, res) => {
	const { drugIndex, email, updatedDrug } = req.body;

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

		res.status(200).json({ response });

		//
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

//Delete user drug
const deleteUserDrug = async (req, res) => {
	const { drugIndex, email } = req.body;

	try {
		const response = await ddb.send(
			new UpdateCommand({
				TableName: TABLE_NAME,
				Key: { email: email },
				UpdateExpression: `REMOVE drugList[${drugIndex}]`,
				ReturnValues: 'ALL_NEW',
			})
		);
		res.status(200).json({ response });

		//
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

//
module.exports = { createUserDrug, editUserDrug, deleteUserDrug };
