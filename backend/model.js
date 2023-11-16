//Drug SchemaS
const drugSchema = {
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
