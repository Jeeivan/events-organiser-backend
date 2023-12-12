import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      }, 
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
      },     
    location: {
        type: String,
        required: true,
      },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group',
    }

})

export const Event = mongoose.model('Event', eventSchema)