import Jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(ApiError.badRequest("You are not authenticated!"));

    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(ApiError.badRequest("Token is not valid!"));
        req.user = user;
        next();
    })
}
