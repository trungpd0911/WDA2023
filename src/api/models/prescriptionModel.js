const mongoose = require('mongoose')

const prescriptionSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        prescriptionDay: {
            type: Date,
            required: true,
        },
        drugs: {
            type: [{ name: String, amount: Number, time: String }],
        },
        totalCost: {
            type: Number,
            required: true,
        },
        treatmentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treatment"
        }
    },
    {
        timestamps: true
    }
)

const Prescription = mongoose.model('Prescription', prescriptionSchema)

module.exports = Prescription
