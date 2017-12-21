module.exports = function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const config = require('../../config');

    var staticFiles = {};
    staticFiles.routes = express.Router();
    staticFiles.devDirectory = __dirname.substr(0, __dirname.length - 24);

    // prepare express server for static content
    staticFiles.routes.use(bodyParser.json());
    staticFiles.routes.use(bodyParser.urlencoded({extended: false}));
    staticFiles.routes.use(express.static(path.join(staticFiles.devDirectory, config.WEB_SERVER_INDEX_PATH)));

    // Simple static file routing
    staticFiles.routes.route('/').get(function (req, res) {
        res.sendFile(path.join(staticFiles.devDirectory, config.WEB_SERVER_INDEX_PATH + 'index.html'));
    });

    return staticFiles;
};