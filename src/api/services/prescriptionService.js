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
    searchByDay: async (id, query) => {
        try {
            const prescription = await Prescription.find({ userID: id });
            if (!prescription) return {
                message: "prescription not found",
                statuscode: 404,
                data: null,
            }
            // search by day
            const searchPrescriptions = await Prescription.find({
                userID: id,
                // prescriptionDay: {
                //     $regex: query.prescriptionDay,
                //     $options: '$i'
                // }
                prescriptionDay: query.prescriptionDay
            });
            if (!searchPrescriptions) return ({
                message: "this day don't have any prescription",
                statuscode: 404,
                data: null,
            })
            return {
                message: "search Prescription successfully",
                statuscode: 200,
                data: searchPrescriptions,
            }
        } catch (err) {
            return {
                message: err.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    sortByDay: async (id, sort, query) => {
        const prescription = await Prescription.find({ userID: id });
        if (!prescription) return {
            message: "prescription not found",
            statuscode: 404,
            data: null,
        }
        try {
            // sort by day (sort = 1 => asc, sort = -1 => desc)
            const prescriptions = await Prescription.find({ userID: id }).sort({ prescriptionDay: sort });
            return {
                message: "sort prescriptions successfully",
                statuscode: 200,
                data: prescriptions,
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