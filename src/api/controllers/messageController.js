const messageModel = require("../models/messageModel");

// create message
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({
        chatId: chatId,
        senderId: senderId,
        text: text,
    });
    try {
        const response = await message.save();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
// get messages from chat
const getMessages = async (req, res) => {
    const ChatId = req.params.id;
    try {
        const messages = await messageModel.find({ chatId: ChatId });
        if (!messages)
            return res.status(404).json("messages not found");
        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = { createMessage, getMessages };