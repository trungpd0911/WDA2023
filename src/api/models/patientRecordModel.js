const mongoose = require('mongoose')

const patientRecordSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        avatar: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Date,
        },
        CID: {
            type: String,
            required: true,
            unique: true,
        },
        healthInsurance: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema)

module.exports = PatientRecord;