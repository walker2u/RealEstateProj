import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPass = bcryptjs.hashSync(password, 9);
    const newUser = new User({ username, email, password: hashPass });
    try {
        await newUser.save();
        res.status(200).json({ "message": "User created successfullly!" });
    } catch (error) {
        next(error);
    }
}