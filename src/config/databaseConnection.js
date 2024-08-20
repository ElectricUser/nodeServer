import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();
const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
	try {
		await mongoose.connect(uri);
		console.log("Successfully connected to DB");
	} catch (err) {
		console.log("Error connecting to DB: ", err);
	}
};
