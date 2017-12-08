const   express     = require('express'),
        bodyParser  = require('body-parser'),
        path        = require('path'),

        logger      = require('../utils/logger')(),
        config      = require('../config'),
        
        router      = express.Router();


const hookedDirname = __dirname.substr(0, __dirname.length-17);

// prepare express server
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(express.static(path.join(hookedDirname, config.WEB_SERVER_INDEX_PATH)));

// Simple static file routing
router.route('/').get(function(req, res){
    res.sendFile(path.join(hookedDirname, config.WEB_SERVER_INDEX_PATH + 'index.html'));
});

module.exports = router;