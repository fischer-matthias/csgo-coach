module.exports = function(database) {

    const express = require('express');
    const TeamModel = require('../models/team')(database);

    const team = {};

    team.routes = express.Router();

    team.routes.route('/').get(function(req, res) {

        const result = TeamModel.getMyTeams(req.user.uid);
        logger.log(JSON.stringify(result));
        res.send({teams: result})
    });

    return team;
}