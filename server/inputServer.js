const   http        = require('http'),
        logger      = require('./logger'),
        CONFIG      = require('./config');


const inputServer = http.createServer( function(req, res) {
 
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
        });
        req.on('end', function () {
            res.end( '' );
        });
    }
    else
    {
        logger.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><body>HTTP Server at http://' + CONFIG.HOST + ':' + CONFIG.PORT + '</body></html>';
        res.end(html);
    }
 
});

module.exports.listen = function(host, port) {
    inputServer.listen(port, host);
    logger.log('Start input Server on ' + host + ':' + port + '.');
}