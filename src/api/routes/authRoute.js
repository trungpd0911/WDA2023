const router = require('express').Router();
const authController = require('../controllers/authController');
const middlewareController = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', middlewareController.verifyToken, authController.logout);

module.exports = router;