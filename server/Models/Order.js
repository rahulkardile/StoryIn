import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema);

export default Order