const   express     = require('express')(),
        http        = require('http').Server(express),
        socket      = require('socket.io')(http),
        logger      = require('./logger');

express.get('/', function(req, res){
    res.sendFile(__dirname + '/web-app/index.html');
});

socket.on('connection', function(socket){
    logger.log('a user connected');
    socket.on('disconnect', function(){
        logger.log('user disconnected');
    });
});

module.exports.listen = function(port) {
    http.listen(port, function(){
        logger.log('Start web server on *:' + port + '.');
    });
}