import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/api/auth";

dotenv.config();
const app = express();

// -------------- Middleware -------------

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Mongo ----------------

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}) // Adding new mongo url parser
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// --------------- Routing ---------------

app.use("/api/auth", authRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// ---------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
