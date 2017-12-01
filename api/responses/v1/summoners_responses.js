// Realm object in this case will default to na realm object which is:
// with this object we actually can now form the urls for the icons
// of the objects
const helpers = require("../helpers");

module.exports = {
    summonerResponse: summoner => {
        if (!summoner) return {};
        return {
            ...summoner,
            revisionDate: summoner.revisionDate,
            profileIconUrl: helpers.contructUrlOfProperty(
                summoner,
                "profileicon"
            )
        };
    }
};

//Summoner object
//
//{"id":39645196,"accountId":202287063,"name":"Gonoflax","profileIconId":3186,"revisionDate":1511757883000,"summonerLevel":34}
