import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import morgan from "morgan";

import config from "./config";

const { MONGO_URI, PORT } = config;

const app = express();

// -------------- Middleware -------------

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ---------------- Mongo ----------------

const db = MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}) // Adding new mongo url parser
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// --------------- Routing ---------------

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// ---------------------------------------

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
