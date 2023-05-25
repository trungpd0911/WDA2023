const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json("User not found");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const password = req.body.password;
        const updateUser = User.findById(id);
        if (!updateUser) {
            return res.status(404).json("User not found");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: {
                    password: hashedPassword,
                }
            }, { new: true });
            return res.status(200).json(updatedUser);
        }
        catch (err) {
            return res.status(500).json(err);
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
