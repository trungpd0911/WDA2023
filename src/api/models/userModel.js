const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
        },
        admin: {
            type: Boolean,
            default: false
        },
        avatar: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema);