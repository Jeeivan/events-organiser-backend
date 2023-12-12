import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      }, 
    code: {
        type: Number,
        required: true,
      }
})

export const Group = mongoose.model('Group', groupSchema)