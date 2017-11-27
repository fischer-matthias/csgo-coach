
const   express     = require('express'),
        http        = require('http').Server(express),
        socket      = require('socket.io')(http),
        fs          = require('fs'),
        config      = require('./config')
        logger      = require('./logger')
        inputServer = require('./inputServer'),
        webServer   = require('./webServer');


// Start applications
inputServer.listen(config.HOST, config.INPUT_SERVER_PORT);

// Start web-server
webServer.listen(config.WEB_SERVER_PORT);