const   express     = require('express'),
        bodyParser  = require('body-parser'),
        path        = require('path'),

        logger      = require('../utils/logger')(),
        config      = require('../config'),

router = express.Router();

router.use(function(req, res, next) {
    if(req.user == null) {
        res.send({error: 'permission denied'});
    } else {
        next();
    }
});

router.route('/').get(function(req, res){
    res.send({test: "hallo"});
});

module.exports = router;