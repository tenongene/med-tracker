require('dotenv').config();
const express = require('express');
const drugRoutes = require('./routes/drugRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use('/api/drugs', drugRoutes);
app.use('/api/user', userRoutes);

//listen for requests
app.listen(PORT, () => {
	console.log(`MedTracker app is listening on port ${PORT}`);
});
