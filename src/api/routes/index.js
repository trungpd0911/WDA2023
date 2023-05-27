const router = require('express').Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute')
const patientRecordRoute = require('./patientRecordRoute')
const treatmentRoute = require('./treatmentRoute')
const PrescriptionRoute = require('./prescriptionRoute')
const chatRoute = require('./chatRoute')
const messageRoute = require('./messageRoute')

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/patientRecord', patientRecordRoute);
router.use('/treatment', treatmentRoute);
router.use('/prescription', PrescriptionRoute);
router.use('/chat', chatRoute);
router.use('/message', messageRoute);

module.exports = router;