module.exports = function(database) {

    const express = require('express');
    const steam = require('steam-login');
    const bodyParser  = require('body-parser');

    const steamAuth = {};
    steamAuth.routes = express.Router();

    // prepare express server
    steamAuth.routes.use(bodyParser.json());
    steamAuth.routes.use(bodyParser.urlencoded({extended: false}));

    steamAuth.routes.route('/authenticate').get(steam.authenticate(), function(req, res) {
        res.redirect('/');
    });

    steamAuth.routes.route('/verify').get(steam.verify(), function(req, res) {
        if(req.user) {
            database.addUser(req.user._json.steamid);
        }
        res.redirect('/');
    });

    steamAuth.routes.route('/logout').get(steam.enforceLogin('/'), function(req, res) {
        req.logout();
        res.redirect('/');
    });

    steamAuth.routes.route('/status').get(function(req, res) {
        if(req.user == null) {
            res.send({user: null});
        } else {
            res.send({user: req.user});
        }
    });

    return steamAuth;
};