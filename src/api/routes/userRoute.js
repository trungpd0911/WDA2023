const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewareController = require('../middlewares/authMiddleware');


router.get("/", middlewareController.verifyToken, userController.getAllUsers);
// router.get("/:id", middlewareController.verifyToken, userController.getUser);
// router.put("/:id", middlewareController.verifyTokenAndAdminAuth, userController.updateUser);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;