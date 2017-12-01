const naRealm = {
    n: {
        item: "7.23.1",
        rune: "7.23.1",
        mastery: "7.23.1",
        summoner: "7.23.1",
        champion: "7.23.1",
        profileicon: "7.23.1",
        map: "7.23.1",
        language: "7.23.1",
        sticker: "7.23.1"
    },
    v: "7.23.1",
    l: "en_US",
    cdn: "http://ddragon.leagueoflegends.com/cdn",
    dd: "7.23.1",
    lg: "7.23.1",
    css: "7.23.1",
    profileiconmax: 28,
    store: null
};

module.exports = {
    contructUrlOfProperty: (obj, type) => {
        let value;
        if (type === "profileicon") {
            value = obj.profileIconId;
        }
        return `${naRealm.cdn}/${naRealm.n[type]}/img/${type}/${value}.png`;
    }
};
