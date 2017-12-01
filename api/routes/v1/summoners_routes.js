const controllers = require("../../controllers");

module.exports = [
    {
        method: "GET",
        path: "/v1/api/summoners",
        config: {
            handler: controllers.v1.summoners.getSummoners
        }
    },
    {
        method: "GET",
        path: "/v1/api/summoners/{accountId}/matches/latest",
        config: {
            handler: controllers.v1.matches.getRecentMatchesByAccount
        }
    }
];
