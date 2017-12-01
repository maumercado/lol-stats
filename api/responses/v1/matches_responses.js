const helpers = require("../helpers");
const _ = require("lodash");

const _matchFormat = (match, accountId) => {
    if (match.participantIdentities) {
        let gameMode = match.gameMode;
        let gameCreation = match.gameCreation;
        let gameDuration = match.gameDuration;

        let meParticipantIds = _.find(match.participantIdentities, p => {
            return p.player.accountId.toString() === accountId;
        });

        let meParticipant = _.find(match.participants, p => {
            return p.stats.participantId === meParticipantIds.participantId;
        });
        let me = {
            ...meParticipant.stats,
            ..._.omit(meParticipant, ["stats"]),
            ...meParticipantIds.player
        };

        let result = {
            gameMode,
            gameCreation,
            gameDuration,
            me
        };

        return result;
    } else {
        return {
            ...match
        };
    }
};

module.exports = {
    matchResponse: (match, accountId) => {
        return _matchFormat(match, accountId) || {};
    },
    matchesResponse: (matches, accountId) => {
        let resultMatches = matches.map(m => _matchFormat(m, accountId));
        return resultMatches || [];
    }
};
