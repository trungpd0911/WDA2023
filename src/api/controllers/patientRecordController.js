const patientRecordService = require('../services/patientRecordService.js');

module.exports = {
    createPatientRecord: async (req, res) => {
        const response = await patientRecordService.createPatientRecord(req.body);
        res.status(response.status).send(response);
    },
    getPatientRecord: async (req, res) => {
        const response = await patientRecordService.getPatientRecord(req.params.id);
        res.status(response.status).send(response);
    },
    getAllPatientRecord: async (req, res) => {
        const response = await patientRecordService.getAllPatientRecord();
        res.status(response.status).send(response);
    },
    updatePatientRecord: async (req, res) => {
        const response = await patientRecordService.updatePatientRecord(req.params.id, req.body);
        res.status(response.status).send(response);
    },
    deletePatientRecord: async (req, res) => {
        const response = await patientRecordService.deletePatientRecord(req.params.id);
        res.status(response.status).send(response);
    }
}


