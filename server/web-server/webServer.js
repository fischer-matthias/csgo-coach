module.exports = function () {

    const express = require('express');
    const steam = require('steam-login');
    const app = express();
    const http = require('http').Server(app);

    const config = require('../config');
    const logger = require('../utils/logger')();

    var webServer = {};
    webServer.database = require('../utils/database')();
    webServer.webSocket = require('./webSocket')(http);

    webServer.init = function () {

        prepareLogging();
        prepareSessionHandling();
        prepareSteamAuth();
        registerRoutes();

        listen();
        webServer.webSocket.init();
    };

    function prepareSessionHandling() {
        app.use(require('express-session')({resave: false, saveUninitialized: false, secret: config.SESSION_SECRET}));
    }

    function prepareLogging() {
        app.use(function (req, res, next) {
            logger.log('IP: ' + req.ip + ' / Request to api with request "' + req.path);
            next();
        });
    }

    function prepareSteamAuth() {

        app.use(steam.middleware({
            realm: config.WEB_SERVER_URL + ':' + config.WEB_SERVER_PORT + '/',
            verify: config.WEB_SERVER_URL + ':' + config.WEB_SERVER_PORT + '/api/steam/verify',
            apiKey: config.STEAM_API_KEY
        }));

    }

    function registerRoutes() {
        app.use('/', require('./routes/static')().routes);

        // api
        app.use('/api/steam/', require('./routes/steam')(webServer.database).routes);
        app.use('/api/csgo/', require('./routes/csgo')(webServer.webSocket).routes);
        app.use('/api/lobby/', require('./routes/lobby')(webServer.database, webServer.webSocket).routes);
    }

    function listen() {
        http.listen(config.WEB_SERVER_PORT, function () {
            logger.log('Start web server on *:' + config.WEB_SERVER_PORT + '.');
        });
    }

    return webServer;
};