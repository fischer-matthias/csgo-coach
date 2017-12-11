module.exports = function() {

    const express = require('express');
    const steam = require('steam-login');
    const bodyParser  = require('body-parser');

    const steamAuth = {};
    steamAuth.router = express.Router();

    // prepare express server
    steamAuth.router.use(bodyParser.json());
    steamAuth.router.use(bodyParser.urlencoded({extended: false}))

    steamAuth.router.route('/authenticate').get(steam.authenticate(), function(req, res) {
        res.redirect('/');
    });

    steamAuth.router.route('/verify').get(steam.verify(), function(req, res) {
        res.redirect('/');
    });

    steamAuth.router.route('/logout').get(steam.enforceLogin('/'), function(req, res) {
        req.logout();
        res.redirect('/');
    });

    steamAuth.router.route('/status').get(function(req, res) {
        if(req.user == null) {
            res.send({user: null});
        } else {
            res.send({user: req.user});
        }
    });

    return steamAuth;
};