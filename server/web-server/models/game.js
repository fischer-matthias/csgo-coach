module.exports = function(database) {
  const logger = require('../../utils/logger')();
  const teamModel = require('./team')(database);

  const game = {};
  game.sessions = new Array();

  /**
   * Starts a new session
   * @param {*} _uid 
   * @param {*} _teamName 
   */
  game.startSession = function(_uid, _teamName) {
    return new Promise((resolve, reject) => {
      const team = teamModel
        .getTeam(_uid, _teamName)
        .then(result => {
          const session = {
            name: _teamName,
            players: result.players
          };

          game.sessions.push(session);
          resolve({ status: 'ok' });
        })
        .catch(error => {
          logger.log(error.error);
          reject(error);
        });
    });
  };

  game.getMySessions = function(_uid) {
    return new Promise((resolve, reject) => {
      game.sessions.forEach(session => {
        if(session.players.indexOf({uid: _uid}) > -1) {
          resolve({key: session.name});
          break;
        }
      });
    });
  }
};
