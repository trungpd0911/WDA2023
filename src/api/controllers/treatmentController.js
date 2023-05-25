const treatmentService = require('../services/treatmentService');

module.exports = {
    createTreatment: async (req, res) => {
        const response = await treatmentService.createTreatment(req.body);
        res.status(response.statuscode).json(response);
    },
    getTreatment: async (req, res) => {
        const response = await treatmentService.getTreatment(req.params.id);
        res.status(response.statuscode).json(response);
    },
    getAllTreatments: async (req, res) => {
        const response = await treatmentService.getAllTreatments(req.params.userId);
        res.status(response.statuscode).json(response);
    },
    updateTreatment: async (req, res) => {
        const response = await treatmentService.updateTreatment(req.params.id, req.body);
        res.status(response.statuscode).json(response);
    },
    deleteTreatment: async (req, res) => {
        const response = await treatmentService.deleteTreatment(req.params.id);
        res.status(response.statuscode).json(response);
    },

}