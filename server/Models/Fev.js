import mongoose from "mongoose";

const FevSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    like: {
        type: Array,
        default: []
    }
});

const Fev = mongoose.model("Fev", FevSchema);

export default Fev;