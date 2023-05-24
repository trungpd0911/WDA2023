const User = require('../models/userModel');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
