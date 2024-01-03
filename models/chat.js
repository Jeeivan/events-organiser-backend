import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    },
    email: {
        type: String,
        required: true,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Chat = mongoose.model('Chat', chatSchema)