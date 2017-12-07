module.exports = function() {
    
    const   express     = require('express'),
            app         = express(),
            http        = require('http').Server(app),
            staticFiles = require('./staticFileRoutes'),
            config      = require('../config'),
            logger      = require('../utils/logger')();

    var webServer = {};

    webServer.webSocket = require('./webSocket')();

    webServer.init = function() {

        webServer.webSocket.init(http);

        registerRoutes();
        listenOnPort();
    };

    function registerRoutes() {
        app.use('/', staticFiles);
    }

    function listenOnPort() {
        http.listen(config.WEB_SERVER_PORT, function(){
            logger.log('Start web server on *:' + config.WEB_SERVER_PORT + '.');
        });
    }
    
    return webServer;
};