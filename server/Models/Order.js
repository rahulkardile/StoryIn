import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
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
    data: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
}, { 
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema);

export default Order