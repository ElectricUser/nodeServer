import express from "express";
export const router = express.Router();
import { register, login, generateJWT } from '../controllers/userController.js'

router.post("/login", async (req, res) => {
	const { username, password } = req.body
	// call controller
	const jwt = await login(username, password)

	if (jwt) {
		// success
		const headers = {
			'Status-Line': "HTTP/1.1 200 OK",
			'Content-Type': "application/json",
			'Authorization': `Bearer ${jwt}`
		}
		res.set(headers);
		res.status(200).json({ message: 'Login Successful' });
		console.log(res.getHeaders())
		res.end();
	} else {
		// failure
		res.status(401).json({ message: 'Invalid credentials' })
	}
});

router.post("/register", async (req, res) => {
	console.log(req.body)
	if (req.body) {
		const username = req.body.username;
		const password = req.body.password;
		//call controller
		const registerUser = await register(username, password)

		registerUser ? res.status(201).send(`user: ${username} created`) : res.status(409).send("User already exists")
	}
})
