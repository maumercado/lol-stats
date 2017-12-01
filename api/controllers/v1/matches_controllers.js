const config = require("../../../config/default");
const responses = require("../../responses");

const LoL = require("../../lib/LoL");
const lolClient = new LoL(config.server.riot_api_key);
const errorHandler = require("../helpers").errorHandler;

module.exports = {
    getRecentMatchesByAccount: async (request, h) => {
        // limit to 10 to not kill the request limit
        // since we can't do it by requesting the api
        // let's do it here by splicing the array

        try {
            let { accountId } = request.params;
            let result = await lolClient.getRecentMatchesByAccountId(
                request.params.accountId
            );
            let latest10Matches = result.matches.slice(0, 11);
            let gamesToRequest = latest10Matches.map(game => {
                return lolClient.getGameDetailsById(game.gameId);
            });
            let gamesWithDetails = await Promise.all(gamesToRequest);

            return {
                matches: responses.v1.matches.matchesResponse(
                    gamesWithDetails,
                    accountId
                )
            };
        } catch (error) {
            errorHandler(error);
        }
    }
};
