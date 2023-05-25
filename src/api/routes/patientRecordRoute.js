const router = require('express').Router();
const patientRecordController = require('../controllers/patientRecordController.js');
const middlewareController = require('../middlewares/authMiddleware');

router.post('/', middlewareController.verifyAdminAuth, patientRecordController.createPatientRecord);
router.get('/:id', middlewareController.verifyTokenAndAdminAuth, patientRecordController.getPatientRecord);
router.get('/', middlewareController.verifyAdminAuth, patientRecordController.getAllPatientRecord);
router.update('/:id', patientRecordController.updatePatientRecord);
router.delete('/:id', middlewareController.verifyToken, patientRecordController.deletePatientRecord);

module.exports = router;