const patientRecordService = require('../services/patientRecordService.js');

module.exports = {
    createPatientRecord: async (req, res) => {
        const response = await patientRecordService.createPatientRecord(req.body);
        res.status(response.statuscode).json(response);
    },
    getPatientRecord: async (req, res) => {
        const response = await patientRecordService.getPatientRecord(req.params.id);
        res.status(response.statuscode).json(response);
    },
    getAllPatientRecord: async (req, res) => {
        const response = await patientRecordService.getAllPatientRecord();
        res.status(response.statuscode).json(response);
    },
    updatePatientRecord: async (req, res) => {
        const response = await patientRecordService.updatePatientRecord(req.params.id, req.body);
        res.status(response.statuscode).json(response);
    },
    deletePatientRecord: async (req, res) => {
        const response = await patientRecordService.deletePatientRecord(req.params.id);
        res.status(response.statuscode).json(response);
    }
}


