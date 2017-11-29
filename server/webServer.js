const   express     = require('express'),
        app         = express(),

        http        = require('http').Server(app),
        socket      = require('socket.io')(http),
        bodyParser  = require('body-parser'),
        path        = require('path'),

        config      = require('./config'),
        logger      = require('./logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, config.WEB_SERVER_INDEX_PATH)));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, config.WEB_SERVER_INDEX_PATH + 'index.html'));
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

module.exports.emit = function(data) {
    socket.emit('message', JSON.stringify(data));
}