const Prescription = require('../models/prescriptionModel')

module.exports = {
    createPrescription: async (data) => {
        const newPrescription = new Prescription(data);
        try {
            await newPrescription.save();
            return {
                message: "create prescription successfully",
                statuscode: 200,
                data: newPrescription,
            }
        }
        catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    getPrescription: async (id) => {
        const prescription = await Prescription.findById(id);
        if (!prescription) return ({
            message: "prescription not found",
            statuscode: 404,
            data: null,
        })
        return ({
            message: "get prescription successfully",
            statuscode: 200,
            data: prescription,
        })
    },
    getAllPrescription: async (id) => {
        try {
            const prescriptions = await Prescription.find({ userID: id });
            if (!prescriptions)
                return ({
                    message: "prescriptions not found",
                    statuscode: 404,
                    data: null,
                })
            else {
                return {
                    message: "get all prescriptions successfully",
                    statuscode: 200,
                    data: prescriptions,
                }
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    updatePrescription: async (id, data) => {
        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return {
                message: "prescription not found",
                statuscode: 404,
                data: null,
            }
        }
        prescription.patientRecordID = data.patientRecordID;
        prescription.userId = data.userId;
        prescription.prescriptionDay = data.prescriptionDay;
        prescription.drugs = data.drugs;
        prescription.totalCost = data.totalCost;
        prescription.treatmentID = data.treatmentID;
        try {
            await prescription.save();
            return {
                message: "update prescription successfully",
                statuscode: 200,
                data: prescription,
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    deletePrescription: async (id) => {
        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return {
                message: "prescription not found",
                statuscode: 404,
                data: null,
            }
        }
        try {
            await Prescription.findByIdAndDelete(id);
            return {
                message: "delete prescription successfully",
                statuscode: 200,
                data: prescription,
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    searchByDay: async (query) => {
        try {
            const prescriptions = await Prescription.find({
                $or: [
                    { prescriptionDay: { $gte: query.from, $lte: query.to } },
                ]
            });
            if (!prescriptions)
                return ({
                    message: "prescriptions not found",
                    statuscode: 404,
                    data: null,
                })
            else {
                return {
                    message: "get all prescriptions successfully",
                    statuscode: 200,
                    data: prescriptions,
                }
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    }
}