import ApiError from "../error/ApiError.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if(user) return next(ApiError.badRequest("User with this email already exist"))

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })

        await newUser.save();
        res.status(200).send("User has been created.")
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    const {secure} = req;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(ApiError.badRequest("User with this email doesn't exist"));
      
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) return next(ApiError.badRequest("Email or password don't match!"))

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const { password, ...other } = user._doc;
        res.cookie("access_token", token, { secure, httpOnly: true, sameSite: secure ? 'None' : 'Lax' }).status(200).json({ ...other, token })
    } catch (error) {
        next(error);
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie('access_token', 'none', {
            expires: new Date(Date.now() + 2 * 1000),
            httpOnly: true,
        })
        res.status(200).json({message: 'User logged out successfully'})
    } catch (error) {
        next(error);
    }
}