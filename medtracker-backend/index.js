// const serverless = require('serverless-http');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT;

const app = express();
//allow cors
app.use(cors(), function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://medtracker.d2va14boe1rzgf.amplifyapp.com');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

//middleware
app.use(express.json());
app.use(morgan('common'));

//routes
app.use('/api/user', userRoutes);

// listen for requests
app.listen(PORT, () => {
	console.log(`MedTracker app is listening on port ${PORT}`);
});

// module.exports.handler = serverless(app);
