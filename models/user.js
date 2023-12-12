import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    groupIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
});

export const User = mongoose.model('User', userSchema)