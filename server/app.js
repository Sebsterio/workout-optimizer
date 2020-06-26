const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

const authRoutes = require("./routes/api/auth");
const logRoutes = require("./routes/api/log");

dotenv.config();

const app = express();

// -------------- Middleware -------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
	app.use(compression());
}

// ---------------- Mongo ----------------

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// --------------- Routing ---------------

app.use("/api/auth", authRoutes);
app.use("/api/log", logRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "..", "client", "build", "index.html")
		);
	});
}

// ---------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

module.exports = app;
