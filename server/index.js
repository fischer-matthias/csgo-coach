
const   express     = require('express'),
        config      = require('./config'),
        logger      = require('./utils/logger'),
        webServer   = require('./web-server/webServer'),
        inputServer = require('./csgo-input-server/inputServer')(webServer.webSocket);


// Start web-server
webServer.init();

// Start csgo-input-server
inputServer.init();