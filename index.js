global.
    httpWeb     = require('express'),
    httpServer  = require('http'),
    fs          = require('fs'),
    CONFIG      = require('./config')
    logger      = require('./logger')
    inputServer = require('./inputServer'),
    webServer   = require('./webServer');


// Start applications
inputServer.listen(CONFIG.PORT_INPUT_SERVER, CONFIG.HOST);
logger.log('Start input Server on ' + CONFIG.HOST + ':' + CONFIG.PORT_INPUT_SERVER + '.');
