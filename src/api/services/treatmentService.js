const Treatment = require('../models/treatmentModel');

module.exports = {
    createTreatment: async (data) => {
        const newTreatment = new Treatment({
            userID: data.userID,
            treatmentDay: data.treatmentDay,
            symptom: data.symptom,
            diagnosis: data.diagnosis,
        });
        try {
            await newTreatment.save();
            return {
                message: "create new treatment successfully",
                statuscode: 200,
                data: newTreatment,
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    getTreatment: async (id) => {
        const treatment = await Treatment.findById(id);
        if (!treatment) {
            return {
                message: "treatment not found",
                statuscode: 404,
                data: null,
            }
        }
        return {
            message: "get treatment successfully",
            statuscode: 200,
            data: treatment,
        }
    },
    getAllTreatments: async (req, res) => {
        const treatment = await Treatment.find();
        return {
            message: "get all treatment successfully",
            statuscode: 200,
            data: treatment,
        }
    },
    updateTreatment: async (id, body) => {
        const treatment = await Treatment.findById(id);
        if (!treatment) {
            return {
                message: "treatment not found",
                statuscode: 404,
                data: null,
            }
        }
        treatment.userID = body.userID;
        treatment.treatmentDay = body.treatmentDay;
        treatment.symptom = body.symptom;
        treatment.diagnosis = body.diagnosis;
        treatment.status = body.status;
        try {
            await treatment.save();
            return {
                message: "update treatment successfully",
                statuscode: 200,
                data: treatment,
            }
        } catch (error) {
            return {
                message: error.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    deleteTreatment: async (id) => {
        const treatment = await Treatment.findById(id);
        if (!treatment) {
            return {
                message: "treatment not found",
                statuscode: 404,
                data: null,
            }
        }
        try {
            await Treatment.findByIdAndDelete(id);
            return {
                message: "delete treatment successfully",
                statuscode: 200,
                data: treatment,
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
}
