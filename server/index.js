import serverless from 'serverless-http'
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import fs, { stat } from "fs"
import path from 'path';
import razorpay from 'razorpay'
import { S3Client } from '@aws-sdk/client-s3';

import User from "./Routes/UserRoutes.js"
import OrederRoute from "./Routes/OrderRoute.js"
import AudioRoute from "./Routes/AudioRoute.js"
import FevRoute from "./Routes/FevRoute.js"

const app = express();
// const __dirname = path.resolve();
app.use(cors({
    origin: 'https://storyin-client.onrender.com',
    credentials: true,
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

dotenv.config();
const PORT = process.env.PORT || 3300
const MONGO_URL = process.env.MONGOURL;
const MONGO_CLOUD_URL = process.env.MONGOURL_CLOUD;

const __dirname = path.resolve();

try {
    mongoose.connect(MONGO_CLOUD_URL)
        .then(() => console.log('Database is connected'))
} catch (error) {
    console.log('Database is error ' + error);
}

export const instance = new razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET,
})

export const s3Clinet = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.s3UserAccess,
        secretAccessKey: process.env.s3UserSecret
    }
})

let cout = 1;

app.get("/api/stream", async(req, res, next) => {
    try {

        const filePath = req.query.path;

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                "statusCode": 404,
                "message": "File not found"
            })
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;

        // Get requested byte range from headers
        const range = req.headers.range;

        let start = 0;
        let end = fileSize - 1; //default entire file

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            start = parseInt(parts[0], 10) || 0;
            end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        }

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileSize,
            'accept-ranges': 'bytes',
            'content-range': `bytes ${start}-${end}/${fileSize}`
        })

        const stream = fs.createReadStream(filePath);
        stream.on('error', (err) => {
            console.error(err)
        })

        stream.pipe(res);

    } catch (error) {
        next(error)
    }
})

app.use("/api/uploads", express.static("uploads"))
app.use("/api/user/", User)
app.use("/api/audio-book/", AudioRoute)
app.use("/api/order/", OrederRoute)
app.use("/api/fev/", FevRoute)

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

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

// export const handler = serverless(app);