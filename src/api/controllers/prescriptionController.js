const prescriptionService = require('../services/prescriptionService.js');

module.exports = {
    createPrescription: async (req, res) => {
        const response = await prescriptionService.createPrescription(req.body);
        res.status(response.statuscode).json(response);
    },
    getPrescription: async (req, res) => {
        const response = await prescriptionService.getPrescription(req.params.id);
        res.status(response.statuscode).json(response);
    },
    getAllPrescriptions: async (req, res) => {
        const response = await prescriptionService.getAllPrescription(req.params.id);
        res.status(response.statuscode).json(response);
    },
    updatePrescription: async (req, res) => {
        const response = await prescriptionService.updatePrescription(req.params.id, req.body);
        res.status(response.statuscode).json(response);
    },
    deletePrescription: async (req, res) => {
        const response = await prescriptionService.deletePrescription(req.params.id);
        res.status(response.statuscode).json(response);
    },
    searchByDay: async (req, res) => {
        const id = req.params.id;
        const response = await prescriptionService.searchByDay(id, req.query);
        res.status(response.statuscode).json(response);
    },
    sortByDay: async (req, res) => {
        const id = req.params.id;
        const sort = req.query.sort;
        const response = await prescriptionService.sortByDay(id, sort, req.query);
        res.status(response.statuscode).json(response);
    }
}