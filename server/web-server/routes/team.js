module.exports = function(database) {
  const express = require('express');
  const logger = require('../../utils/logger')();
  const teamModel = require('../models/team')(database);

  const team = {};
  team.routes = express.Router();

  /**
   * Prehandling permissions
   */
  team.routes.use(function(req, res, next) {
    if (req.user == null) {
      res.status(403).send({ status: 'nok', error: 'Permission denied.' });
    } else {
      next();
    }
  });

  /**
   * Get all teams of current user
   */
  team.routes.route('/').get(function(req, res) {
    const uid = req.user._json.steamid;

    teamModel
      .getMyTeams(uid)
      .then(result => res.status(200).send({ teams: result }))
      .catch(error => res.status(406).send(error));
  });

  /**
   * Get specific team
   */
  team.routes.route('/:name').get(function(req, res) {
    const uid = req.user._json.steamid;
    const name = req.params.name;

    teamModel
      .getTeam(uid, name)
      .then(result => res.status(200).send({ team: result }))
      .catch(error => res.status(406).send(error));
  });

  /**
   * Update specific team
   */
  team.routes.route('/:name').post(function(req, res) {
    const uid = req.user._json.steamid;
    const team = req.body;

    teamModel
      .updateTeam(uid, team)
      .then(result => res.status(200).send(result))
      .catch(error => res.status(406).send(error));
  });

  /**
   * Create a new team
   */
  team.routes.route('/').put(function(req, res) {
    const newTeam = req.body;
    teamModel
      .createTeam(req.user._json.steamid, newTeam)
      .then(result => res.status(201).send(result))
      .catch(error => res.status(406).send(error));
  });

  /**
   * Join a team
   */
  team.routes.route('/join/:name').post(function(req, res) {
    const joinReq = req.body;
    const name = req.params.name;

    if (name && joinReq.activateCode) {
      joinReq.uid = req.user._json.steamid;

      teamModel
        .joinTeam(joinReq.uid, name, joinReq.activateCode)
        .then(_result => res.status(200).send(_result))
        .catch(_error => res.status(406).send(_error));
    } else {
      res.status(406).send({ status: 'nok', error: 'Parameter not filled.' });
    }
  });

  return team;
};
