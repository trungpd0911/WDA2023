const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewareController = require('../middlewares/authMiddleware');


router.get("/", middlewareController.verifyAdminAuth, userController.getAllUsers);
router.get("/:id", middlewareController.verifyTokenAndAdminAuth, userController.getUser);
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, userController.updateUser);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;