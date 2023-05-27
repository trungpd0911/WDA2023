const router = require('express').Router();
const treatmentController = require('../controllers/treatmentController.js');
const middlewareController = require('../middlewares/authMiddleware');

router.post('/', middlewareController.verifyAdminAuth, treatmentController.createTreatment);
router.get('/:id', middlewareController.verifyToken, treatmentController.getTreatment);
router.get('/', middlewareController.verifyToken, treatmentController.getAllTreatments);
// get all treatments of a patient
router.get('/patient/:id', middlewareController.verifyTokenAndAdminAuth, treatmentController.getAllTreatmentsOfPatient);
router.put('/:id', middlewareController.verifyAdminAuth, treatmentController.updateTreatment);
router.delete('/:id', middlewareController.verifyAdminAuth, treatmentController.deleteTreatment);

module.exports = router;