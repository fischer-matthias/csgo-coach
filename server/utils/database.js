module.exports = function () {
    const logger = require('./logger')();
    const config = require('./../config');
    const client = require('mongodb').MongoClient;

    var database = {};
    var mongodbConnection = null;
    var url = 'mongodb://' + config.MONGODB_USER + ':' + config.MONGODB_PASS + '@' + config.MONGODB_HOST + ':' + config.MONGODB_PORT + '/' + config.MONGODB_NAME;

    client.connect(url, function (err,db) {
        if (err) throw err;
        logger.log('Connect to mongodb succesful.');

        mongodbConnection = db.db(config.MONGODB_NAME);
    });

    database.addUser = function(uid) {

        var user = {
            uid: uid,
            role: 'user'
        };

        mongodbConnection.collection("User").find(user).toArray(function(err, result) {
            if(err) throw err;
            if(result.length > 0) {
                logger.log("User " + user.uid + " logged in.");
            } else {
                mongodbConnection.collection("User").insertOne(user, function(err, res) {
                    if (err) throw err;
                    logger.log("User " + user.uid + " was created.");
                });
            }
          });
    }

    database.getTeams = function(uid) {
        mongodbConnection.collection('Teams').find({"players.uid": uid})
            .toArray(function(err, result) {
                if(err) throw err;
                return result;
            })
    }

    return database;
};