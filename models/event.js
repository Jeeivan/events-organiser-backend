import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      }, 
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
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