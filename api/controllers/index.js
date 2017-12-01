const fs = require("fs");

const controllers = {};

fs
    .readdirSync(__dirname)
    .filter(file => file !== "index.js")
    .forEach(file => {
        controllers[file] = require(`./${file}`);
    });

module.exports = controllers;
