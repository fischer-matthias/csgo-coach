module.exports = function() {

    const express = require('express');

    var api = {};
    api.routes = express.Router();

    api.routes.use(function(req, res, next) {
        if(req.user == null) {
            res.send({error: 'permission denied'});
        } else {
            next();
        }
    });

    api.routes.route('/').get(function(req, res){
        res.send({test: "hallo"});
    });

    return api;
};
