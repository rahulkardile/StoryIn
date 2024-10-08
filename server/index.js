import serverless from 'serverless-http';
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import fs, { stat } from "fs"
import path from 'path';
import razorpay from 'razorpay';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { S3Client } from '@aws-sdk/client-s3';
import cluster from 'cluster';
import os from "os";

import User from "./Routes/UserRoutes.js"
import OrederRoute from "./Routes/OrderRoute.js"
import AudioRoute from "./Routes/AudioRoute.js"
import FevRoute from "./Routes/FevRoute.js"

const totalCPUs = 1;

dotenv.config();
const PORT = process.env.PORT || 3300
const MONGO_URL = process.env.MONGOURL;
const MONGO_CLOUD_URL = process.env.MONGOURL_CLOUD;

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

if (cluster.isPrimary) {
    console.log(`Total cpu's are ${os.cpus().length} . . . \n`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (Worker, code, single) => {
        console.log(`Worker ${process.pid} is died`);
        cluster.fork();
    })
} else {

    const app = express();
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        message: {
            message: "Too many requests, please try again later.",
            success: true,
        }
    })

    app.use(cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173/' || "*",
        optionsSuccessStatus: 200
    }));

    app.use(helmet());
    app.use(limiter);
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))

    try {
        mongoose.connect(MONGO_CLOUD_URL).then(()=>console.log('Database s connected . . . '));
    } catch (error) {
        console.log('Database is error ' + error);
    }

    const __dirname = path.resolve();

    let cout = 1;

    app.get("/api/stream", async (req, res, next) => {
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
    app.use("/api/fev/", FevRoute);

    app.get("/pid", (req, res) => {
        res.send({
            message: `pid is ${process.pid}`,
            success: true
        })
    })

    app.use(express.static(path.join(__dirname, 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    })

    // app.get("*", (req, res, next)=>{
    //     try {
    //         res.status(404).json({
    //             success: true,
    //             message: "Route Not Found!"
    //         })
    //     } catch (error) {
    //         next(errorHandler(error))
    //     }
    // })

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
}