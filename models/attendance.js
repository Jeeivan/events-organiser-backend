import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    },
    going: {
        type: Boolean,
    }
})

export const Attendance = mongoose.model('Attendance', attendanceSchema)