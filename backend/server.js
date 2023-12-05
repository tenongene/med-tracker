require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/user', userRoutes);

//listen for requests
app.listen(PORT, () => {
	console.log(`MedTracker app is listening on port ${PORT}`);
});
