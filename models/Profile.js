const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    location: {
        type: String
    },
    favorite: {
        type: String,
        required: true
    },
    playing: {
        type: [String]
    },
    bio : {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        twitch: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);