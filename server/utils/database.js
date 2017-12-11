module.exports = function () {
    const logger = require('./logger')();
    const config = require('./../config');
    const client = require('mongodb').MongoClient;

    var database = {};
    var url = 'mongodb://' + config.MONGODB_USER + ':' + config.MONGODB_PASS + '@' + config.MONGODB_HOST + ':' + config.MONGODB_PORT + '/' + config.MONGODB_NAME;

    client.connect(url, function (err, db) {
        if (err) throw err;
        logger.log('Database created');
        db.close();
    });

    return database;
};