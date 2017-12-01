const fs = require("fs");

const responses = {};

fs
    .readdirSync(__dirname)
    .filter(file => file !== "index.js")
    .forEach(file => {
        responses[file.split("_")[0]] = require(`./${file}`);
    });

module.exports = responses;
