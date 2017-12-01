const fs = require("fs");

const middlewares = {};

fs
    .readdirSync(__dirname)
    .filter(file => file !== "index.js")
    .forEach(file => {
        middlewares[file] = require(`./${file}`);
    });

module.exports = middlewares;
