import express from "express"
import ListBook from "../Models/ListAudioBook.js"
import { verifyUser } from "../utils/VerifyUser.js";
import { errorHandler } from "../utils/errHandler.js";
import fs, { ReadStream } from "fs";
import { upload } from "../middleware/multer.js";

// import audioFile from "../uploads/episode/AUR - TU HAI KAHAN - Raffey - Usama - Ahad (Official Music Video).m4a"

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

            console.log("poster : ", poster);
            console.log("epi : ", episodes);

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
        const List = await ListBook.findById(id).populate("user");
        res.status(200).json(List)
    } catch (error) {
        next(error)
    }
})

routes.get("/get", async (req, res, next) => {
    try {

        const id = req.params.id
        const List = await ListBook.find().populate("user").limit(8).sort({ createdAt: -1 })

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

        const id = req.params.id
        const List = await ListBook.find().populate("user").limit(8).sort({ createdAt: 1});

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
        const List = await ListBook.find({user: id });
        const newList = []
        List.map((item, i)=> {
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

// routes.patch("/update/:id", verifyUser, async (req, res, next) => {
//     try {

//         const id = req.params.id;
//         const userId = req.user._id;

//         const { title, description, status, date } = req.body;

//         const List = await Todo.findById(id);
//         if (!List) return next(errorHandler(404, "Not Found"));
//         if (List.user != userId) return next(errorHandler(400, "bad request!"))


//         if (title) List.title = title
//         if (description) List.description = description
//         if (status) List.status = status
//         if (date) List.date = date

//        const data  = await List.save();



//         res.status(200).json(data)

//     } catch (error) {
//         next(error)
//     }
// })


// routes.delete("/delete/:id", verifyUser, async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//         const id = req.params.id;

//         const List = await Todo.findById(id);
//         if (!List) return next(errorHandler(400, "Not Found"))
//         if (List.user != userId) return next(errorHandler(400, "bad request!"))

//         await Todo.findByIdAndDelete(id)
//         res.status(200).json("delete successfully");

//     } catch (error) {
//         next(error)
//     }
// })


export default routes
