"use strict";
const axios = require("axios");
const assert = require("assert");

class LoL {
    constructor(key, version = "v3") {
        assert(key, "Key param is required");
        this.key = key;
        this.headers = {
            "X-Riot-Token": this.key
        };
        this.version = version;
        this.baseUrl = "api.riotgames.com";
        this.region = "na1"; // let's default to region NA1, makes things easier
    }

    getSummonerBySummonerId(summonerId, region = "na1") {
        assert(summonerId, "id of Summoner is required");

        let endpoint = `/lol/summoner/${this.version}/summoners/${summonerId}`;
        let method = "GET";
        let options = {
            method,
            endpoint
        };

        return this._request(options);
    }

    getSummonerBySummonerName(summonerName) {
        assert(summonerName, "id of Summoner is required");

        let endpoint = `/lol/summoner/${this.version}/summoners/by-name/${
            summonerName
        }`;
        let method = "GET";
        let options = {
            method,
            endpoint
        };

        return this._request(options);
    }

    getRecentMatchesByAccountId(accountId) {
        let endpoint = `/lol/match/${this.version}/matchlists/by-account/${
            accountId
        }/recent`;

        let method = "GET";
        let options = {
            method,
            endpoint
        };

        return this._request(options);
    }

    getGameDetailsById(gameId) {
        let endpoint = `/lol/match/${this.version}/matches/${gameId}`;

        let method = "GET";
        let options = {
            method,
            endpoint
        };

        return this._request(options);
    }

    _constructBaseUrl() {
        return `https://${this.region}.${this.baseUrl}`;
    }

    async _request({ endpoint, method }) {
        let url = this._constructBaseUrl();
        try {
            const response = await axios({
                method,
                url: url + endpoint,
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            if (error.response.status < 500) {
                return;
            }
            console.error(error);
            throw new Error(error);
        }
    }
}

module.exports = LoL;
