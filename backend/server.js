require('dotenv').config();
const express = require('express');
const drugRoutes = require('./routes/drugs');

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

//listen for requests
app.listen(PORT, () => {
	console.log(`MedTracker app is listening on port ${PORT}`);
});
