import express from "express"
import { instance } from "../index.js"
import { verifyUser } from "../utils/VerifyUser.js";
import crypto from "crypto"
import Order from "../Models/Order.js";
import { errorHandler } from "../utils/errHandler.js";
import { User } from "../Models/User.js";

const router = express.Router();

// try {
//     User.updateMany({gender: "male"},{status: false}).then(()=> console.log("done"))
// } catch (error) {
//     console.log(error);
// }

router.post("/checkout", verifyUser, async (req, res, next) => {

    console.log("checkout triggerd");
    const { amount } = req.body;
    const email = req.user.email;

    try {
        const options = {
            currency: "INR",
            amount: Number(amount * 100),
            receipt: "receipt1",
            payment_capture: 0
        }

        instance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                next(err)
            } else {
                res.status(200).json({
                    success: true,
                    order
                })
            }
        })
        
    } catch (error) {
        next(error)
    }
})

router.post("/verify", verifyUser, async (req, res, next) => {
    try {

        const data = req.user;
        const { order_Id, payment_Id, signature, amount } = req.body;

        if (!order_Id, !payment_Id, !signature, !amount) return next(errorHandler(402, "some fields are missing!"))

        const body = order_Id + "|" + payment_Id;
        const expectedSign = crypto.createHmac("sha256", process.env.KEYSECRET).update(body.toString()).digest('hex');
        const isAuth = expectedSign === signature;

        const date = new Date();
        let month;
        let duration;

        if (amount >= 100 && amount <= 160) {
            duration = "month";
            month = date.getMonth() + 2;

        } else {
            duration = "year"
            month = date.getMonth() + 12;
        }

        let day = date.getDate();
        let year = date.getFullYear();

        let expiry = `${day}/${month}/${year}`
        let curruntDate = new Date().toLocaleDateString();

        if (isAuth) {
            await Order.create({
                orderId: order_Id,
                paymentId: payment_Id,
                signature,
                amount: amount,
                date: curruntDate,
                expiry: expiry,
                userId: data._id,
                duration,
                email: data.email,
            })

            await User.findByIdAndUpdate(data._id, { status: true });

            res.status(200).json({ success: true })

        } else {
            res.status(403).json({
                success: false,
            })
        }

    } catch (error) {
        next(error)
    }
})

router.get("/key", async (req, res, next) => {
    return res.status(200).json({
        success: true,
        key: process.env.KEYID
    })
})

router.get("/get", verifyUser, async (req, res, next) => {
    try {
        const { _id } = await req.user;
        const get = await Order.findOne({ userId: _id });

        if (!get) return next(errorHandler(404, "Not Subcribed yet!"))

        const { createdAt, _id: id, __v, updatedAt, signature, userId, paymentId, email, ...rest } = await get._doc

        res.status(200).json({
            success: true,
            order: rest
        })

    } catch (error) {
        next(error)
    }
})

export default router;