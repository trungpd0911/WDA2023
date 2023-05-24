const mongoose = require('mongoose')

const patientRecordSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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
            required: true
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