
const   express     = require('express'),
        http        = require('http').Server(express),
        socket      = require('socket.io')(http),
        fs          = require('fs'),
        CONFIG      = require('./config')
        logger      = require('./logger')
        inputServer = require('./inputServer'),
        webServer   = require('./webServer');


// Start applications
inputServer.listen(CONFIG.HOST, CONFIG.PORT_INPUT_SERVER);

// Start web-server
webServer.listen(CONFIG.PORT_WEB_SERVER);