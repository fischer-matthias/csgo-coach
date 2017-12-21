module.exports = function(database) {

    const logger = require('../../utils/logger');
    const team = {};

    team.getMyTeams = function(uid) {
        try {
            return database.getTeams(req.user.uid);
        } catch(err) {
            logger.log(err);
        }
    }

    return team;
}