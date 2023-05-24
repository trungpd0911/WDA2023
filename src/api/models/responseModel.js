class Response {
    constructor(message = "", error = false, data = {}) {
        this.message = message;
        this.error = error;
        this.data = data;
    }
}

// return res.status(200).json(Response("Failed to delete user", true));