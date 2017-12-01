const fs = require("fs");

const middlewares = {};

fs
    .readdirSync(__dirname)
    .filter(file => file !== "index.js")
    .forEach(file => {
        middlewares[file.split("_")[0]] = require(`./${file}`);
    });

module.exports = middlewares;
