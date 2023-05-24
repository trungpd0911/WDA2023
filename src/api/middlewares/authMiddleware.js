const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        const refreshToken = req.cookies.refreshToken;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // console.log(req.user.admin);
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            }
            else {
                res.status(403).json("You are not allowed to do that");
            }
        });
    },
    verifyAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.admin) {
                next();
            }
            else {
                res.status(403).json("You are not allowed to do that");
            }
        });
    }
}

module.exports = middlewareController;