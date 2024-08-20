import express from "express";
export const router = express.Router();
import bcrypt from "bcryptjs";

router.post("/login", (req, res) => {
	res.send("hello");

	console.log(req.body);
	const password = req.body.password;
	const numSaltRounds = 8;
	const pwHash = bcryptjs.hash(password, numSaltRounds);
});
