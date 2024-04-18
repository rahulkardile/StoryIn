import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    poster: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true
    },
    episodes: {
        type: Array,
        required: true
    },
}, 
{
    timestamps: true
}
)
const ListBook = mongoose.model("ListBook", TodoSchema);

export default ListBook