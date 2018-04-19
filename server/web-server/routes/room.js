module.exports = function(database, webSocket) {
    
    const express = require('express');
    const logger = require('../../utils/logger')();
    const teamModel = require('../models/team')(database);
    
    const room = {};
    room.routes = express.Router();
    
    /**
    * Prehandling permissions
    */
    room.routes.use(function(req, res, next) {
        if (req.user == null) {
            res.status(403).send({ status: 'nok', error: 'Permission denied.' });
        } else {
            next();
        }
    });
    
    /**
    * Get room for team
    */
    room.routes.route('/:name').get(function(req, res) {
        const uid = req.user._json.steamid;
        const name = req.params.name;
        
        teamModel.getMyTeams(uid)
        .then(result => {
            
            var isMemberOfTeam = false;
            
            for(var i=0; i < result.length; i++) {
                if(result[i].name == name) {
                    isMemberOfTeam = true;
                    break;    
                }
            }
            
            if(isMemberOfTeam) {
                var currentRoom = null;
                
                // room already available?
                for(var i=0; i < webSocket.rooms.length; i++) {
                    if(webSocket.rooms[i].name == name) {
                        currentRoom = webSocket.rooms[i];
                        currentRoom.users.push(uid);
                        break;
                    }
                }

                // if not create the room
                if(currentRoom == null) {
                    currentRoom = webSocket.createRoom(name, uid);
                }

                // feedback
                if(currentRoom == null) {
                    res.status(406).send({'status': 'nok', 'error': 'Room creation failed!'})
                } else {
                    res.status(200).send({'room': currentRoom.name, 'key': currentRoom.key});
                }
                
            } else {
                res.status(406).send({'status': 'nok', 'error': 'Not allowed to join the room!'});
            }
        })
        .catch(error => res.status(406).send(error));
    });
    
    return room;
}