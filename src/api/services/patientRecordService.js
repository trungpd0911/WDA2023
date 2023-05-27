const PatientRecord = require("../models/patientRecordModel.js");

module.exports = {
    createPatientRecord: async (data) => {
        const checkPatientRecord = await PatientRecord.findOne({ CID: data.CID });
        if (checkPatientRecord) return ({
            message: "CID already exists",
            statuscode: 400,
            data: null,
        })
        const newPatientRecord = new PatientRecord({
            userID: data.userID,
            name: data.name,
            age: data.age,
            CID: data.CID,
            healthInsurance: data.healthInsurance,
        });
        try {
            await newPatientRecord.save();
            return {
                message: "create new patient record successfully",
                statuscode: 200,
                data: newPatientRecord,
            }
        } catch (error) {
            return {
                message: error.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    getPatientRecord: async (id) => {
        try {
            const patientRecord = await PatientRecord.findOne({ userID: id });
            if (!patientRecord) {
                return {
                    message: "patient record not found",
                    statuscode: 404,
                    data: null,
                }
            }
            return {
                message: "get patient record successfully",
                statuscode: 200,
                data: patientRecord,
            }
        } catch (error) {
            return {
                message: error.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    getAllPatientRecord: async () => {
        const patientRecord = await PatientRecord.find();
        return {
            message: "get all patient record successfully",
            statuscode: 200,
            data: patientRecord,
        }
    },
    updatePatientRecord: async (id, data) => {
        try {
            const patientRecord = await PatientRecord.findById(id);
            if (!patientRecord) {
                return {
                    message: "patient record not found",
                    statuscode: 404,
                    data: null,
                }
            }
            patientRecord.userID = data.userID;
            patientRecord.name = data.name;
            patientRecord.age = data.age;
            patientRecord.CID = data.CID;
            patientRecord.healthInsurance = data.healthInsurance;
            await patientRecord.save();
            return {
                message: "update patient record successfully",
                statuscode: 200,
                data: patientRecord,
            }
        } catch (error) {
            return {
                message: error.message,
                statuscode: 500,
                data: null,
            }
        }
    },
    deletePatientRecord: async (id) => {
        try {
            const patientRecord = await PatientRecord.findById(id);
            if (!patientRecord) {
                return {
                    message: "patient record not found",
                    statuscode: 404,
                    data: null,
                }
            }
            await PatientRecord.findByIdAndDelete(id);
            return {
                message: "delete patient record successfully",
                statuscode: 200,
                data: patientRecord,
            }
        } catch (error) {
            return {
                message: error.message,
                statuscode: 500,
                data: null,
            }
        }
    },
}