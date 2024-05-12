import express from "express"
import ListBook from "../Models/ListAudioBook.js"
import { verifyUser } from "../utils/VerifyUser.js";
import { errorHandler } from "../utils/errHandler.js";
import { rm } from "fs";
import { upload } from "../middleware/multer.js";

const routes = express.Router();

routes.post("/new", verifyUser, upload.fields([{ name: "img", maxCount: 1 }, { name: "epi", maxCount: 50 }]), async (req, res, next) => {
    try {
        const data = req.user;
        const { title, description, date, tags } = req.body;

        if (!title, !description, !date, !tags) return next(errorHandler(400, "something is mising"));

        const manageAudio = async () => {

            let poster;
            let episodes = [];
            let audioData = [];
            let newData = [];

            const img = await req.files.epi

            audioData.push(img);
            audioData = await audioData[0];

            newData.push(audioData)

            // newData.map(i => episodes.push(i.path))

            episodes = audioData[0].path
            poster = await req.files.img[0].path;

            const NewABook = await ListBook.create({
                title,
                description,
                user: data._id,
                tags,
                poster,
                episodes
            })

            res.status(200).json({
                success: true
            });
        }

        manageAudio();

    } catch (error) {
        next(error)
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

        // const List = await ListBook.find().populate("user").limit(8).sort({ createdAt: -1 })
        const raw = await ListBook.find().populate("user").select(["title", "poster", "user", "_id"]).limit(8).sort({ createdAt: -1 })

        const List = [];

        raw.forEach((i) => {
            const modified = {
                _id: i._id,
                title: i.title,
                user: {
                    name: i.user.name,
                },
                poster: i.poster
            }

            List.push(modified);
        })

        res.status(200).json({
            success: true,
            data: List
        })
    } catch (error) {
        next(error)
    }
})

routes.get("/trending", async (req, res, next) => {
    try {

        const raw = await ListBook.find().populate("user").limit(8).sort({ createdAt: 1 });

        const List = [];

        raw.forEach((i) => {
            const modified = {
                _id: i._id,
                title: i.title,
                user: {
                    name: i.user.name,
                },
                poster: i.poster
            }

            List.push(modified);
        })

        res.status(200).json({
            success: true,
            data: List
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
        const { _id, role } = req.user;
        const id = req.params.id;

        const Book = await ListBook.findById(id);

        if (!Book) return next(errorHandler(400, "Not Found"))
        if (Book.user != _id) return next(errorHandler(400, "bad request!"))

        const deleteFileList = [];
        deleteFileList.push(Book.poster);
        Book.episodes.forEach(i => deleteFileList.push(i));

        deleteFileList.forEach(async (i) => {

            rm(i, (err, data) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        console.log("File not found!");
                        return next(errorHandler(404, "File not found"))
                    } else {
                        console.log(err);
                    }
                }
            })

        })

        await ListBook.findOneAndDelete({ _id: Book._id });
        res.status(200).json({
            success: true,
            message: "deleted successfully!"
        })

    } catch (error) {
        next(error)
    }
})

export default routes
