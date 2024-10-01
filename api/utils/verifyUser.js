import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    console.log('Working');

    const token = req.cookies.access_token;
    console.log("token", token);

    if (!token) return next(errorHandler(401, "Unauthorized!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbiden!'));
        req.user = user;
    });
    next();
}