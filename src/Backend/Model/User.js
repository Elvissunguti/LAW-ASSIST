const mongoose = require("mongoose");

const User =  new mongoose.Schema({
    googleId: {
        type: String
    },
    displayName: {
        type: String
    },
    chatHistory: [{
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
