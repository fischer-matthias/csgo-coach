module.exports = (database, webSocket) => {
    
    const express = require('express');
    const logger = require('../../utils/logger')();
    
    const lobby = {};
    lobby.routes = express.Router();
    
    /**
    * Prehandling permissions
    */
    lobby.routes.use((req, res, next) => {
        if (req.user == null) {
            res.status(403).send({ status: 'nok', error: 'Permission denied.' });
        } else {
            next();
        }
    });

    /**
     * Create new lobby.
     */
    lobby.routes.route('/').put((req, res) => {
        const uid = req.user._json.steamid;
        const lobbyName = req.body.name;

        // create new lobby
        var currentLobby = webSocket.createLobby(lobbyName, uid);

        // send feedback
        if(currentLobby == null) {
            res.status(406).send({'status': 'nok', 'error': 'lobby creation failed!'})
        } else {
            res.status(200).send({'name': currentLobby.name, 'key': currentLobby.key});
        }
    });

    /**
     * Join an existing lobby.
     */
    lobby.routes.route('/').post((req, res) => {
        const uid = req.user._json.steamid;
        const lobbyKey = req.body.key;

        // join a lobby
        var currentLobby = webSocket.joinLobby(lobbyKey, uid);

        // send feedback
        if(currentLobby == null) {
            res.status(406).send({'status': 'nok', 'error': 'lobby join failed!'})
        } else {
            res.status(200).send({'name': currentLobby.name, 'key': currentLobby.key});
        }
    });

    /**
     * Get current lobby
     */
    lobby.routes.route('/').get((req, res) => {
        const uid = req.user._json.steamid;
        var currentLobby = null;

        try {
            webSocket.lobbies.forEach((lobby) => {
                if(lobby.users.indexOf(uid) > -1) {
                    currentLobby = lobby;
                    throw BreakException;
                }
            });
        } catch(e) {}


        if(currentLobby == null) {
            res.status(406).send({'status': 'nok', 'error': 'No lobby available.'});
        } else {
            res.status(200).send({'name': currentLobby.name, 'key': currentLobby.key});
        }
    });

    /**
     * Remove user of lobby
     */
    lobby.routes.route('/:lobbyKey').delete((req, res) => {
        const uid = req.user._json.steamid;
        const lobbyKey = req.params.lobbyKey;
        var index = -1;

        try {
            webSocket.lobbies.forEach((lobby) => {
                if(lobby.key == lobbyKey) {
                    index = lobby.users.indexOf(uid);
                    if(index > -1) {
                        lobby.users.splice(index, 1);

                        if(!lobby.users.length) {
                            var lobbyIndex = webSocket.lobbies.indexOf(lobby);
                            webSocket.lobbies.splice(lobbyIndex, 1);
                        }
                    }
                    throw BreakException;
                }
            });
        } catch(e) {}

        if(index == -1) {
            res.status(406).send({'status': 'nok', 'error': 'No lobby available.'});
        } else {
            res.status(200).send({'status': 'ok'});
        }
    });
    
    return lobby;
}