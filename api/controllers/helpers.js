const Boom = require("boom");
module.exports = {
    errorHandler: error => {
        console.error(error);
        if (error.response) {
            return new Boom(error.response.data, {
                statusCode: error.response.status
            });
        } else if (error.request) {
            return new Boom(error.request);
        } else {
            return new Boom(error.message);
        }
    }
};
