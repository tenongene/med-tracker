require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	//verify
	console.log(req.headers);
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader || !authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Authorization token required' });
	}

	const bearerToken = authHeader.split(' ')[1];

	try {
		const { id } = jwt.verify(bearerToken, process.env.JWT_SECRET);
		req.id = id;
		//
	} catch (error) {
		console.log(error.message);
		res.status(401).json({ error: 'Request not authorized', msg: error.message });
	}
	next();
};

const redirect = (req, res, next) => {
	res.redirect(`/api/user/${req.uid}`);
	next();
};

module.exports = { requireAuth, redirect };
