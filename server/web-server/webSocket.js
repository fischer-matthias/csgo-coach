module.exports = function(http) {

    const logger   = require('../utils/logger')();
    const socket = require('socket.io')(http);
    const uniqid   = require('uniqid');

    const webSocket = {};
    webSocket.rooms = new Array();

    /**
     * Initalize socket.io functions.
     */
    webSocket.init = function() {
        socket.on('connection', (socket) => {
            logger.log('A user connected');

            socket.on('room', (roomKey) => {
                logger.log('User\'ll try to join a room with the key ' + roomKey + '.');
                socket.join(roomKey, () => {
                    logger.log('User joined a room with the key ' + roomKey + '.')
                });
            }); 
    
            socket.on('disconnect', () => {
                logger.log('A user disconnected');
            });
        });
    }

    /**
     * Emit a json message to the clients.
     * @param {JSON} message 
     */
    webSocket.emitMessage = function(message) {
        var steamId = message.provider.steamid;

        try {
            webSocket.rooms.forEach((room) => {
                if(room.users && room.users.indexOf(steamId) > -1){
                    logger.log('Emit message to room: ' + room.name);
                    socket.in(room.key).emit('message', JSON.stringify(message));
                    throw BreakException;
                }
            });
        } catch(e) {}
    };

    /**
     * Creates a new room.
     * @param {string} roomName 
     */
    webSocket.createRoom = function(roomName, uid) {
        const room = {'name': roomName, 'key': uniqid(), 'users': [uid]};
        logger.log("Room '" + roomName + "' with key '" + room.key + "' created.")
        webSocket.rooms.push(room);
        return room;
    };

    return webSocket;
};