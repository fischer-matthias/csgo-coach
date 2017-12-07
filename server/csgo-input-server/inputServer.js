module.exports = function(webSocket) {
    const   http        = require('http'),
            logger      = require('../utils/logger'),
            config      = require('../config');

    var inputServer = {};

    inputServer.init = function() {
        startListening();
    };

    function startListening() {
        http.createServer(requestHandling).listen(config.INPUT_SERVER_PORT, config.INPUT_SERVER_HOST);
        logger.log('Start input Server on ' + config.INPUT_SERVER_HOST + ':' + config.INPUT_SERVER_PORT + '.');
    }

    function requestHandling(req, res) {
    
        if (req.method == 'POST') {
            logger.log("Handling POST request...");
            res.writeHead(200, {'Content-Type': 'text/html'});
        
            var body = '';
            req.on('data', function (json) {
    
                // parse text to json
                var data = JSON.parse(json);
    
                // extract necessary objects
                var currentPlayer = data['player'];
                var gameData = data['map'];
    
                if(webSocket !== null) {
                    webSocket.emitMessage(data);
                }
            });
            req.on('end', function () {
                res.end( '' );
            });
        }
        else
        {
            logger.log("Not expecting other request types...");
            res.writeHead(200, {'Content-Type': 'text/html'});
            var html = '<html><body>HTTP Server at http://' + config.HOST + ':' + config.INPUT_SERVER_PORT + '</body></html>';
            res.end(html);
        }
    }

    return inputServer;
};