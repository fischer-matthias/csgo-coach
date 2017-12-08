const   express     = require('express'),
        bodyParser  = require('body-parser'),
        path        = require('path'),

        logger      = require('../utils/logger')(),
        config      = require('../config'),

router      = express.Router();

router.route('/').get(function(req, res){
    res.send({test: "hallo"});
});

module.exports = router;