const   express     = require('express'),
        bodyParser  = require('body-parser'),
        path        = require('path'),

        logger      = require('../utils/logger'),
        config      = require('../config'),
        
        router      = express.Router();

// TODO: necessary?
// prepare express server
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(express.static(path.join(__dirname, config.WEB_SERVER_INDEX_PATH)));
// TODO: necessary?

// Logging function for every api request
router.use(function(req, res, next) {
    logger.log('Request to api with request: ' + req);
    next();
});

// Simple static file routing
router.route('/').get(function(req, res){
    res.sendFile(path.join(__dirname, config.WEB_SERVER_INDEX_PATH + 'index.html'));
});

module.exports = router;