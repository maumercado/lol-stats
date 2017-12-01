const Hapi = require("hapi");
const config = require("../config/default");
const routes = require("./routes");
const bunyan = require("bunyan");

// const logger = bunyan.createLogger({ name: "LoL API", level: "debug" });

const initServer = async config => {
    const server = new Hapi.Server({
        port: config.server.port,
        state: {
            strictHeader: false
        },
        routes: { cors: { origin: ["*"] } }
    });

    try {
        await server.register({ plugin: require("inert") });
        await server.register({ plugin: require("vision") });

        server.views({
            engines: {
                html: require("handlebars")
            },
            relativeTo: __dirname,
            path: "../client/build/"
        });

        server.ext("onPostHandler", (request, h) => {
            if (
                request.response.isBoom &&
                request.response.output.statusCode === 404
            ) {
                return h.view("404.html", {
                    config: JSON.stringify(config.client)
                });
            }

            return h.continue;
        });

        const ReactRoutes = [
            {
                method: "GET",
                path: "/{param*}",
                handler: {
                    directory: {
                        path: "client/build"
                    }
                }
            },
            {
                method: "GET",
                path: "/",
                handler: function(request, h) {
                    return h.view("index.html", {
                        config: JSON.stringify(config.client)
                    });
                }
            }
        ];

        const allRoutes = [].concat(ReactRoutes, routes.v1);
        server.route(allRoutes);

        server.start();
    } catch (e) {
        console.error("error registering plugins", e);
    }
};

module.exports = initServer;
