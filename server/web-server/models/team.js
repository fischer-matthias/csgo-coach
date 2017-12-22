module.exports = function(database) {

    const logger = require('../../utils/logger')();
    const team = {};

    team.getMyTeams = function(uid) {
        try {
            return database.getTeams(uid);
        } catch(err) {
            logger.log(err);
        }
    }

    team.createTeam = function(uid, team) {

        try {
            team.admin = uid;
            team.players = [];
            team.players.push({uid: uid});
            return database.createTeam(team);
        } catch(err) {
            logger.log(err);
        }

    }

    return team;
}