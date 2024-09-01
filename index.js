import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { router as authRouter } from "./src/routes/authentication.js";
import cors from "cors";
import { connectDB } from "./src/config/databaseConnection.js";
import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

// intialize db connection
connectDB();

const app = express();
const port = 3000;
const __dirname = fileURLToPath(import.meta.url);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// Parse URL-encoded bodies (for example, application/x-www-form-urlencoded content-type)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authRouter);

function error(err, req, res, next) {
	// respond with 500 "Internal Server Error".
	res.status(500);
	res.send("Internal Server Error");
}

// Routes
app.get("/", (req, res, next) => {
	console.log("First request received");
	console.log(req);
	next();
});

app.get("/", (req, res, next) => {
	res.send({ data: "welcome to hell" });
});

app.use(error);

app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});