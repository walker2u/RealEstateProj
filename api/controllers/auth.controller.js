import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {

    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler('404', "User not Found!"));
    const validPassword = await bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler('401', "Wrong Credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
}