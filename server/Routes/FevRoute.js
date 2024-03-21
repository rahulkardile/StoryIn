import express from "express";
import { verifyUser } from "../utils/VerifyUser.js";
import Fev from "../Models/Fev.js";
import ListBook from "../Models/ListAudioBook.js";

const routes = express.Router();

routes.post("/create/:id", verifyUser, async (req, res, next) => {

    try {
        const { id } = req.params;
        const userId = req.user._id
        const getFev = await Fev.findOne({ user: userId })

        if (!getFev) {
            const addFev = await Fev.create({
                user: userId,
                like: [id]
            })
            return res.status(200).json({
                message: "Added To The Favorite",
            })

        } else {
            if (!getFev.like.includes(id)) {
                await getFev.updateOne({ $push: { like: id } });
                res.status(200).json({
                    success: true,
                    message: "Added To The Favorites"
                })

            } else {
                await getFev.updateOne({ $pull: { like: id } });
                res.status(200).json({
                    success: true,
                    message: "Removed From The Favorite"
                })
            }
        }
    } catch (error) {
        next(error)
    }
})

routes.get("/", async (req, res, next) => {
    const get = await Fev.find();

    res.json(get)
})

routes.get("/userList", verifyUser, async (req, res, next) => {
    try {

        const userId = req.user._id
        const getList = await Fev.findOne({ user: userId })
        const { like } = await getList._doc



        // const data = await ListBook.find({ '_id': { $in: like } })
        const data = await ListBook.find().where("_id").in(like);
        res.status(200).json(
            data
        )

    } catch (error) {
        next(error);
    }
})



export default routes;