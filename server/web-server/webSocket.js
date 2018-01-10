module.exports = function(http) {

    const logger = require('../utils/logger')();
    const socket = require('socket.io')(http);
    const uniqid = require('uniqid');

    const webSocket = {};
    webSocket.rooms = new Array();

    webSocket.emitMessage = function(message) {
        socket.emit('message', JSON.stringify(message));
    };

    /**
     * Creates a new room.
     * @param {string} roomName 
     */
    webSocket.createRoom = function(roomName) {
        logger.log('Room ' + roomName + ' created.');
        const room = {'name': roomName, 'key': uniqid()};
        webSocket.rooms.push(room);
        return room;
    };

    function onConnection() {
        socket.on('connection', function(socket){
            logger.log('a user connected');
            socket.on('disconnect', function(){
                logger.log('user disconnected');
            });
        });
    }

    return webSocket;
};