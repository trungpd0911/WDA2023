const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
    try {
        await mongoose.connect(
            process.env.mongodb_url,
        );
        console.log("mongoose connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDb,
};