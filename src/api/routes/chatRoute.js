const { createChat, findUserChat, findChat } = require('../controllers/chatController');

const router = require('express').Router();

router.post("/", createChat)
router.get("/:id", findUserChat);
router.get("/:firstId/:secondId", findChat);

module.exports = router;