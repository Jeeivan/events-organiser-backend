import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    groupIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
});

export const User = mongoose.model('User', userSchema)