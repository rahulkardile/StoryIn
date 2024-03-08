import express from "express"
import { instance } from "../index.js";
import { verifyUser } from "../utils/VerifyUser.js";
import crypto from "crypto"
import Order from "../Models/Order.js";

const router = express.Router();

router.post("/checkout", verifyUser, async (req, res, next) => {

    const { amount } = req.body;
    const email = req.user.email;

    const options = {
        currency: "INR",
        amount: Number(amount * 100),
        receipt: "receipt#1",
        payment_capture: 0
    }

    instance.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
        } else {
            console.log(order);

            res.status(200).json({
                success: true,
                order
            })
        }
    })
})

router.post("/verify", verifyUser, async (req, res, next) => {
    try {

        const data = req.user;
        const { order_Id, payment_Id, signature, amount } = req.body;
        const body = order_Id + "|" + payment_Id;
        const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(body.toString()).digest('hex');
        const isAuth = expectedSign === signature;

        let duration;
        let expriry;
        if(amount > 100 && amount < 160){
            duration = Month;
            expriry = Date.now()
        }else{
            duration = year
            expriry = Date.now() 
        
        }

        if (isAuth) {
            const createOrder = await Order.create({
                orderId: order_Id,
                paymentId: payment_Id,
                signature,
                Date: new Date(),
                expriry: Date.now() + 
                duration,
                user: data._id
            })

            res.status(200).json({
                success: true,
                order: createOrder
            })

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
        key: process.env.KEY_ID
    })
})

export default router;