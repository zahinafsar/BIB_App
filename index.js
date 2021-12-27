require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var morgan = require("morgan");
var cors = require("cors");

//Routers
const authRoutes = require("./routes/auth");
//Routers


// Middleware
const middleware = [cors(), express.json(), express.static("public"), bodyParser.urlencoded({ extended: false }), bodyParser.json()];
app.use(middleware);
// Middleware

// MongoDB configuration
const db = require("./config/db");
mongoose
	.connect(db.connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("Mongodb Connected..."))
	.catch((err) => console.log(err));

app.use(morgan("tiny"));
// MongoDB configuration

//Use Routes
app.use("/api", authRoutes);
//Use Routes

//error handling
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
//error handling

//serve app
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
//serve app
