const router = require('express').Router();
const prescriptionController = require('../controllers/prescriptionController.js');
const middlewareController = require('../middlewares/authMiddleware');

router.post('/', middlewareController.verifyAdminAuth, prescriptionController.createPrescription);
router.get('/:id', middlewareController.verifyTokenAndAdminAuth, prescriptionController.getPrescription);
router.get('/all/:id', middlewareController.verifyTokenAndAdminAuth, prescriptionController.getAllPrescriptions);
router.put('/:id', middlewareController.verifyAdminAuth, prescriptionController.updatePrescription);
router.delete('/:id', middlewareController.verifyAdminAuth, prescriptionController.deletePrescription);
// search
router.get('/search', middlewareController.verifyToken, prescriptionController.searchByDay);

module.exports = router;