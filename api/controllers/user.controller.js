import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        "message": "Hello MK!"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Update your own account only, no hacking!"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(401, "Delete your account only, no hacking!"));
    try {
        await User.findByIdAndDelete(req.params.id,);
        res.clearCookie("access_token");
        res.status(201).json("User Deleted Succesfully!")
    } catch (error) {
        next(error);
    }

}