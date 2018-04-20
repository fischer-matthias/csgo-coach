module.exports = function(http) {

    const logger   = require('../utils/logger')();
    const socket = require('socket.io')(http);
    const uniqid   = require('uniqid');

    const webSocket = {};
    webSocket.lobbies = new Array();

    /**
     * Initalize socket.io functions.
     */
    webSocket.init = function() {
        socket.on('connection', (socket) => {
            logger.log('User connected.');

            socket.on('room', (lobbyKey) => {
                logger.log('User\'ll try to join a lobby with the key ' + lobbyKey + '.');
                socket.join(lobbyKey, () => {
                    logger.log('User joined a lobby with the key ' + lobbyKey + '.')
                });
            }); 
    
            socket.on('disconnect', () => {
                logger.log('User disconnected.');
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
            webSocket.lobbies.forEach((lobby) => {
                if(lobby.users && lobby.users.indexOf(steamId) > -1){
                    logger.log('Emit message to lobby: ' + lobby.name);
                    socket.in(lobby.key).emit('message', JSON.stringify(message));
                    throw BreakException;
                }
            });
        } catch(e) {}
    };

    /**
     * Creates a new lobby.
     * @param {string} lobbyName 
     */
    webSocket.createLobby = function(lobbyName, uid) {
        const lobby = {'name': lobbyName, 'key': uniqid(), 'users': [uid]};
        logger.log("Lobby '" + lobbyName + "' with key '" + lobby.key + "' created.")
        webSocket.lobbies.push(lobby);
        return lobby;
    };

    /**
     * User joins a lobby
     * @param {string} lobbyKey 
     * @param {string} uid 
     */
    webSocket.joinLobby = (lobbyKey, uid) => {
        var retLobby = null;

        try {
            webSocket.lobbies.forEach((lobby) => {
                if(lobby.key == lobbyKey) {
                    lobby.users.push(uid);
                    retLobby = lobby;
                    logger.log('User ' + uid + ' joined lobby ' + lobby.name + '.');
                    throw BreakException;
                }
            });
        } catch(e) {}

        return retLobby;
    }

    return webSocket;
};