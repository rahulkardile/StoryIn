import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import fs from "fs"
import path from 'path';
import razorpay from 'razorpay'

// graphQL SetUp
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4"

import User from "./Routes/UserRoutes.js"
import OrederRoute from "./Routes/OrderRoute.js"
import AudioRoute from "./Routes/AudioRoute.js"
import FevRoute from "./Routes/FevRoute.js"

const app = express();
// const __dirname = path.resolve();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
// app.use(status());

app.use(express.urlencoded({ extended: false }))

dotenv.config();
const PORT = 3300
const MONGO_URL = process.env.MONGOURL;
const MONGO_CLOUD_URL = process.env.MONGOURL_CLOUDE;


try {
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Database is connected'))
} catch (error) {
    console.log('Database is error ' + error);
}

export const instance  = new razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET,
})

let cout= 1;

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.get("/", (req, res) => {
    res.json("Welcome to server and this is rahul")
})

app.get("/api/stream", async (req, res, next) => {
    try {

        const filePath = req.query.path
        
        if (!filePath) return next(errorHandler(404, "File Not found"));
       
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;        // legnth of the audio file
        const range = req.headers.range;   // get range of audio file

        const head = {
            "Content-Length": fileSize,
            "Content-Type": "audio/mp3"
        }

        res.writeHead(200, head);
        console.log("streaming " + cout);

        cout++;
        fs.createReadStream(filePath).pipe(res)

    } catch (error) {
        next()
    }
})

app.use("/api/uploads", express.static("uploads"))

app.use("/api/user/", User)
app.use("/api/audio-book/", AudioRoute)
app.use("/api/order/", OrederRoute)
app.use("/api/fev/", FevRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400;

    if (err.code === '11000') return err.message = "user already exist!"
    let message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} . . .`);
})