const initServer = require("./api");
const config = require("./config/default");

try {
    initServer(config);
    console.log(`All process started on port ${config.server.port}`);
} catch (error) {
    console.error(error);
}
