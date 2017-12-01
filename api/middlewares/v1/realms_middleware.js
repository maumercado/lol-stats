const Boom = require("boom");
const LoL = require("../../lib/LoL");
const config = require("../../../config/default");
module.exports = {
    getRealmInfo: async (request, h) => {
        try {
            const lolClient = new LoL(config.server.riot_api_key);
            const resp = await lolClient.getRegionRealm(request.query.region);
            return { resp, lolClient };
        } catch (error) {
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
    }
};
