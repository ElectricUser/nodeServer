import { User } from '../models/User.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function register(username, password) {
    const numSaltRounds = 8;
    const hashedPw = await bcryptjs.hash(password, numSaltRounds);
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const newUser = new User({ username, password: hashedPw });
        await newUser.save();
        console.log(`New user created successfully - ${username} `);
        return true;
    } catch (err) {
        console.log('There was an err: ', err);
        return false;
    }
}

export async function login(username, password) {
    try {
        const existingUser = await User.findOne({ username })
        // check if passwords match
        const match = await bcryptjs.compare(password, existingUser.password);
        if (match) {
            //passwords match
            console.log("Logged in successfully as", username);
            const jwt = generateJWT(username);
            return jwt;
        }
        //passwords do not match
        return false
    } catch (err) {
        console.log('There was an error login in');
    }
}

export function generateJWT(username) {
    //Generate Private key
    const privateKey = process.env.SECRET_JWT_KEY;
    //Create Payload

    //Generate JWT
    const issuedAt = Math.floor(Date.now() / 1000);
    const oneHour = Math.floor(Date.now() / 1000) + (60 * 60);

    const token = jwt.sign({
        sub: username,
        iss: process.env.SERVER_DOMAIN, //issuer
        aud: process.env.CLIENT_DOMAIN, //audience
        iat: issuedAt,  // issued at (seconds)
        exp: oneHour // expiration (seconds)
    }, privateKey);

    return token;
}