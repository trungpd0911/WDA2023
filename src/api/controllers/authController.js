const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const authService = require('../services/authService');
let refreshTokens = [];

authController = {
    register: async (req, res) => {
        try {
            if (!req.body.username || !req.body.password || !req.body.phone) {
                return res.status(400).json("missing username or password or phone");
            }
            //check phone number exists
            if (req.body.phone.length < 10 || req.body.phone.length > 11) {
                return res.status(400).json("phone number must be 10 or 11 digits");
            }
            const checkUser = await User.findOne({ phone: req.body.phone });
            if (checkUser) {
                return res.status(400).json("phone number already exists");
            }
            //hash password

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user 
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                phone: req.body.phone,
            });
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // generate access token 
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "1d",
            }
        )
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "1d",
            }
        )
    },

    login: async (req, res) => {
        try {
            if (!req.body.phone || !req.body.password) {
                return res.status(400).json("missing username or password");
            }
            const user = await User.findOne({ phone: req.body.phone });
            if (!user) {
                return res.status(404).json("wrong password or username");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("wrong password or username");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken,
                    {
                        httpOnly: true,
                        secure: false,
                        // deploy chuyen qua true 
                        path: "/",
                        sameSite: "strict",
                    })
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // redis
    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken);
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            return res.status(200).json({
                accessToken: newAccessToken,
            });
        });
    },
    logout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        return res.status(200).json("You have logged out successfully");
    },
}

module.exports = authController;