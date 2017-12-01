const config = require("../../../config/default");
const responses = require("../../responses");

const LoL = require("../../lib/LoL");
const lolClient = new LoL(config.server.riot_api_key);

const errorHandler = require("../helpers").errorHandler;

module.exports = {
    getSummoners: async (request, h) => {
        try {
            let result = await lolClient.getSummonerBySummonerName(
                request.query.search
            );
            if (result) {
                return {
                    summoner: responses.v1.summoners.summonerResponse(result)
                };
            } else {
                return null;
            }
        } catch (error) {
            errorHandler(error);
        }
    }
};
