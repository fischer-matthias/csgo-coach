module.exports = (webSocket) => {

    const express = require('express');
    const bodyParser  = require('body-parser');

    const csgo = {};
    csgo.webSocket = webSocket;
    csgo.routes = express.Router();

    csgo.routes.use(bodyParser.json());
    csgo.routes.use(bodyParser.urlencoded({extended: false}));

    csgo.routes.route('/').post((req, res) => {
        csgo.webSocket.emitMessage(req.body);
        res.end();
    });

    return csgo;
};