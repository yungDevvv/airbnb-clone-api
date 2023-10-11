import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import housesRoute from './routes/houses.js';
import usersRoute from './routes/users.js';
import reservationsRoute from './routes/reservation.js';
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';

const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const connect = async () => {
    console.log("Trying to connect")
    try {
        await mongoose.connect(process.env.MONGODB)
            .then(() => console.log('MONGODB connected'))
    } catch (err) {
        throw err;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/houses", housesRoute);
app.use("/api/users", usersRoute);
app.use("/api/reservations", reservationsRoute);

app.use(ErrorHandlingMiddleware);


app.listen(5000, () => {
    console.log('Connected with PORT: 5000');
    connect();
}) 
