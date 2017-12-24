module.exports = function(database) {
  const logger = require('../../utils/logger')();
  const collection = 'Team';
  const team = {};

  /**
   * Returns all teams that includes a specific player.
   * @param {*} _uid
   */
  team.getMyTeams = function(_uid) {
    return new Promise((resolve, reject) => {
      const query = { players: { uid: _uid } };
      database
        .getAll(collection, query)
        .then(result => {
          result.forEach(element => {
            if (element.admin != _uid) {
              element.activateCode = null;
            }
          });
          resolve(result);
        })
        .catch(error => reject(error));
    });
  };

  /**
   * Returns a specific team.
   * @param {*} _uid
   * @param {*} _name
   */
  team.getTeam = function(_uid, _name) {
    return new Promise((resolve, reject) => {
      const query = { name: _name, players: { uid: _uid } };
      database
        .getOne(collection, query)
        .then(result => {
          if (result.admin != _uid) {
            result.activateCode = null;
          }
          resolve(result);
        })
        .catch(error => reject(error));
    });
  };

  /**
   * Creates a new team.
   * @param {*} _uid
   * @param {*} _team
   */
  team.createTeam = function(_uid, _team) {
    return new Promise((resolve, reject) => {
      _team.admin = _uid;
      _team.players = [];
      _team.players.push({ uid: _uid });
      database
        .create(collection, _team)
        .then(result => {
          resolve(result);
        })
        .catch(error => reject(error));
    });
  };

  /**
   * Updates a specific team.
   * @param {*} _uid
   * @param {*} _team
   */
  team.updateTeam = function(_uid, _team) {
    return new Promise((resolve, reject) => {
      const query = { admin: _uid, name: _team.name };
      database
        .getOne(collection, query)
        .then(result => {
          result.desc = _team.desc;
          result.activateCode = _team.activateCode;
          database
            .update(collection, result, query)
            .then(_result => resolve(_result))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  };

  /**
   * Join a specific team.
   * @param {*} _uid
   * @param {*} _name
   * @param {*} _activateCode
   */
  team.joinTeam = function(_uid, _name, _activateCode) {
    return new Promise((resolve, reject) => {
      const teamQuery = { name: _name };
      database.getOne(collection, teamQuery).then(result => {
        if (result) {
          if (result.activateCode == _activateCode) {
            result.players.push({ uid: _uid });
            database
              .update(collection, result, teamQuery)
              .then(result => resolve(result))
              .catch(error => reject(error));
          } else {
            reject('Activation code is wrong.');
          }
        } else {
          reject('Team not available.');
        }
      });
    });
  };

  return team;
};
