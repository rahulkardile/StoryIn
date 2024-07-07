import express from "express";
import ListBook from "../Models/ListAudioBook.js";
import { verifyUser } from "../utils/VerifyUser.js";
import { errorHandler } from "../utils/errHandler.js";
import { rm } from "fs";
import { upload } from "../middleware/multer.js";
import { s3Clinet } from "../index.js";
import { GetObjectCommand, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const routes = express.Router();

routes.post("/new", verifyUser, async (req, res, next) => {
    try {
        const data = req.user;
        const { title, description, date, tags, episodes, poster } = req.body;

        if (!title, !description, !date, !tags, !episodes, !poster, !data._id) return next(errorHandler(400, "something is mising"));

        const NewABook = await ListBook.create({
            title,
            description,
            user: data._id,
            tags,
            poster,
            episodes
        })

        const message = title.substr(0, 30);
        res.status(200).json({
            message: message + "...",
            success: true
        });

    } catch (error) {
        console.log(error);
        next(error)
    }
})

// get object from s3
routes.post("/s3/getPoster", async (req, res, next) => {
    try {

        const { key } = req.body;

        const command = new GetObjectCommand({
            Bucket: "storyin",
            Key: key
        });

        const url = await getSignedUrl(s3Clinet, command);

        res.status(200).json({
            url,
            success: true
        })
    } catch (error) {
        next(error);
    }
})

// upload Files
routes.post("/s3/upload", verifyUser, async (req, res, next) => {
    try {

        const { FileName, FileType, type } = req.body;

        if (type === "image") {

            const Key = `uploads/Posters/${"Poster_" + Date.now() + "_" + FileName}`;

            const command = new PutObjectCommand({
                Bucket: "storyin",
                Key,
                ContentType: FileType
            });

            const url = await getSignedUrl(s3Clinet, command);

            res.status(200).json({
                url,
                Key,
                success: true
            })
        } else if (type === "epi") {
            const Key = `uploads/Episodes/${"Epi_" + Date.now() + "_" + FileName}`;

            const command = new PutObjectCommand({
                Bucket: "storyin",
                Key,
                ContentType: FileType
            });

            const url = await getSignedUrl(s3Clinet, command);

            res.status(200).json({
                url,
                Key,
                success: true
            })
        }

    } catch (error) {
        next(error);
    }
})

routes.get("/get/:id", async (req, res, next) => {
    try {

        const id = req.params.id
        const raw = await ListBook.findById(id).populate("user");

        const modified = {
            _id: raw._id,
            title: raw.title,
            description: raw.description,
            user: {
                _id: raw.user._id,
                name: raw.user.name,
            },
            poster: raw.poster,
            tags: raw.tags,
            episodes: raw.episodes,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt
        }


        res.status(200).json(modified)
    } catch (error) {
        next(error)
    }
})

routes.get("/getU/:id", async (req, res, next) => {
    try {

        const id = req.params.id
        const List = await ListBook.findById(id);
        res.status(200).json(List)
    } catch (error) {
        next(error)
    }
})

routes.get("/get", async (req, res, next) => {
    try {

        const raw = await ListBook.find().populate("user", "name").select(["title", "poster", "user", "_id"]).limit(8).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: raw
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

routes.get("/trending", async (req, res, next) => {
    try {

        const raw = await ListBook.find().populate("user", "name").limit(8).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: raw
        })

    } catch (error) {
        next(error)
    }
})

routes.get("/userBooks", verifyUser, async (req, res, next) => {
    try {

        const id = await req.user._id
        const List = await ListBook.find({ user: id });
        const newList = []
        List.map((item, i) => {
            const { description, tags, episodes, createdAt, updatedAt, __v, ...rest } = item._doc
            newList.push(rest)
        })

        res.status(200).json({
            success: true,
            data: newList
        })

    } catch (error) {
        next(error)
    }
})

routes.post("/update/:id", verifyUser, async (req, res, next) => {
    try {

        const id = req.params.id;
        const userId = req.user._id;

        const { title, description, tags } = req.body;

        if (!title, !description, !tags) {
            return next(errorHandler(400, "Can't Update"))
        }

        const List = await ListBook.findById(id);
        if (!List) return next(errorHandler(404, "Not Found"));
        if (List.user != userId) return next(errorHandler(400, "bad request!"))

        await ListBook.updateOne({ _id: id }, {
            title: title,
            description: description,
            tags: tags
        }).then(() => {
            res.status(200).json({
                success: true,
                message: "Book is updated"
            })
        }).catch((err) => {
            console.log(err);
        })

    } catch (error) {
        next(error)
    }
})


routes.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {
        console.log("working");
        const { _id: userId, role } = req.user;
        const id = req.params.id;

        const Book = await ListBook.findById(id);

        if (!Book) return next(errorHandler(400, "Not Found"))
        if (Book.user != userId) return next(errorHandler(400, "bad request!"))
        let isBookDeleted;

        await Promise.all(
            Book.episodes.map(async (item) => {
                console.log(item);
                try {
                    await s3Clinet.send(
                        new HeadObjectCommand({
                            Bucket: "storyin",
                            Key: item
                        })
                    )

                    const command = new DeleteObjectCommand({
                        Bucket: "storyin",
                        Key: item
                    })

                    await s3Clinet.send(command);
                    await ListBook.findOneAndDelete({ _id: Book._id });

                    isBookDeleted = true;
                    res.status(200).json({
                        success: true,
                        isBookDeleted,
                        url: Book.poster,
                        message: "deleted successfully!",
                    })

                } catch (error) {
                    isBookDeleted = false;
                    console.log(error);
                    next(errorHandler(404, "File not Found"));
                }
            })
        );

    } catch (error) {
        next(error)
    }
})

export default routes
