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

    database.getTeams = function(_uid) {

        const query = {players: {uid: _uid}};
        return new Promise( (resolve, reject) => {
            mongodbConnection.collection('Teams').find(query)
            .toArray(function(err, result) {

                if(err) {
                    throw err;
                    reject(err);
                }

                resolve(result);
            });
        });
    }

    database.getTeam = function(_uid, _name) {
        const query = {name: _name, players: {uid: _uid}};
        return new Promise( (resolve, reject) => {
            mongodbConnection.collection('Teams').findOne(query, function(err, doc) {
                if(err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    database.createTeam = function(team) {
        return new Promise((resolve, reject) => {

            const query = {name: team.name};

            mongodbConnection.collection('Teams').find(query).toArray(function(err, result) { 
                if(result.length > 0) {
                    reject('Team ' + team.name + ' is already existing.');
                } else {
                    mongodbConnection.collection('Teams').insertOne(team, function(err, res) {
                        if (err) throw err;
                        logger.log('Team ' + team.name + ' was created successful.');
                        resolve();
                    });
                }
            });
        });
    }

    database.updateTeam = function(team) {
        return new Promise((resolve, reject) => {

            const query = {_id: team._id};

            mongodbConnection.collection('Teams').replaceOne(query, team, function(error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    return database;
};