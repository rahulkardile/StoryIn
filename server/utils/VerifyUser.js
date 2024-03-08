import jwt from "jsonwebtoken";
import { errorHandler } from "./errHandler.js";

export const verifyUser = (req, res, next) => {
    const token = req.cookies._user_access;

    if (!token) return next(errorHandler(401, "User is not authenticated!"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(400, "Invalid Cookies"))

        req.user = user;
        next();
    })

}
