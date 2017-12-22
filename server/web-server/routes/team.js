module.exports = function(database) {

    const express = require('express');
    const logger = require('../../utils/logger')();
    const TeamModel = require('../models/team')(database);

    const team = {};

    team.routes = express.Router();

    team.routes.use(function(req, res, next) {
        if(req.user == null) {
            res.send({error: 'permission denied'});
        } else {
            logger.log('Allowed ...');
            next();
        }
    });

    team.routes.route('/').get(function(req, res) {

        TeamModel.getMyTeams(req.user._json.steamid).then((result) => {
            logger.log(JSON.stringify(result));
            res.send({teams: result})
        });

    });

    team.routes.route('/').put(function(req, res) {
        
        var newTeam = req.body;
        TeamModel.createTeam(req.user._json.steamid, newTeam).then((result) => {
            res.send('OK');
        });
        
    });

    return team;
}