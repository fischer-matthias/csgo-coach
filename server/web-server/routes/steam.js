module.exports = (database) => {

    const express = require('express');
    const steam = require('steam-login');
    const bodyParser  = require('body-parser');
    const userModel = require('../models/user')(database);
    const logger = require('../../utils/logger')();

    const steamAuth = {};
    steamAuth.routes = express.Router();

    // prepare express server
    steamAuth.routes.use(bodyParser.json());
    steamAuth.routes.use(bodyParser.urlencoded({extended: false}));

    steamAuth.routes.route('/authenticate').get(steam.authenticate(), (req, res) => {
        res.redirect('/');
    });

    steamAuth.routes.route('/verify').get(steam.verify(), (req, res) => {
        if(req.user) {
            const uid = req.user._json.steamid;

            userModel.verify(uid)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => {
                    // lol
                    res.redirect('/');
                });
        }
        
    });

    steamAuth.routes.route('/status').get((req, res) => {
        if(req.user == null) {
            res.send({user: null});
        } else {
            res.send({user: req.user});
        }
    });

    steamAuth.routes.route('/logout').get(steam.enforceLogin('/'), (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return steamAuth;
};