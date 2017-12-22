module.exports = function(database) {
  const logger = require('../../utils/logger')();
  const team = {};

  team.getMyTeams = function(uid) {
    try {
      return database.getTeams(uid);
    } catch (err) {
      logger.log(err);
    }
  };

  team.getTeam = function(uid, name) {
    try {
      return database.getTeam(uid, name);
    } catch (err) {
      logger.log(err);
    }
  };

  team.createTeam = function(uid, team) {
    try {
      team.admin = uid;
      team.players = [];
      team.players.push({ uid: uid });
      return database.createTeam(team);
    } catch (err) {
      logger.log(err);
    }
  };

  team.updateTeam = function(_uid, _team) {
    try {
      return new Promise((resolve, reject) => {
        database.getTeam(_uid, _team.name)
        .then(team => {
          if (team.admin != _uid) {
            reject('Permission denied.');
          } else {

            team.name = _team.name;
            team.desc = _team.desc;
            team.activateCode = _team.activateCode;

            database
              .updateTeam(team)
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      logger.log(err);
    }
  };

  return team;
};
