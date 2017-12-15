module.exports = function(database) {

    const express = require('express');
    const team = {};

    team.routes = express.Router();

    team.routes.route('/').get(function(req, res) {

        const result = database.getTeams(req.user.uid);
        logger.log(JSON.stringify(result));
        res.send({teams: result})
    });

    return team;
}