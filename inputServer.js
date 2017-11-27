const   CONFIG = require('./config'),
        logger = require('./logger'),
        http    = require('http'),
        fs      = require('fs');

const InputServer = http.createServer( function(req, res) {
 
    if (req.method == 'POST') {
        logger.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
    
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            logger.log("POST payload: " + body);
            res.end( '' );
        });
    }
    else
    {
        logger.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }
 
});

module.exports = InputServer;