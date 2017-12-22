module.exports = function(database) {
  const express = require('express');
  const logger = require('../../utils/logger')();
  const TeamModel = require('../models/team')(database);

  const team = {};

  team.routes = express.Router();

  team.routes.use(function(req, res, next) {
    if (req.user == null) {
      res.status(403).send({ status: 'nok', error: 'Permission denied.' });
    } else {
      next();
    }
  });

  team.routes.route('/').get(function(req, res) {
    const uid = req.user._json.steamid;

    TeamModel.getMyTeams(uid).then(result => {
      result.forEach(element => {
        if (element.admin != uid) {
          element.admin = null;
          element.activateCode = null;
        }
      });

      res.status(200).send({ teams: result });
    });
  });

  team.routes.route('/:name').get(function(req, res) {
    const uid = req.user._json.steamid;
    const name = req.params.name;

    TeamModel.getTeam(uid, name).then(result => {
      if (result.admin != uid) {
        result.admin = null;
        result.activateCode = null;
      }

      res.status(200).send({ team: result });
    });
  });

  team.routes.route('/:name').post(function(req, res) {
    const uid = req.user._json.steamid;
    const team = req.body;

    TeamModel.updateTeam(uid, team)
      .then(result => {
        if(result) {
          res.status(200).send({ status: 'ok' });
        } else {
          res.status(406).send({status: 'nok', error: 'Team not found.'})
        }
        
      })
      .catch(err => {
        res.status(406).send({ status: 'nok', error: err });
      });
  });

  team.routes.route('/').put(function(req, res) {
    const newTeam = req.body;
    TeamModel.createTeam(req.user._json.steamid, newTeam)
      .then(result => {
        res.status(201).send({ status: 'ok' });
      })
      .catch(err => {
        res.status(406).send({ status: 'nok', error: err });
      });
  });

  return team;
};
