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

    /**
     * Creates a new object in the database
     * @param {*} collection 
     * @param {*} document 
     */
    database.create = function(collection, document) {
        return new Promise((resolve, reject) => {
            mongodbConnection.collection(collection).insertOne(document, (error, result) => {
                if(error) {
                    logger.log(error);
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Updates a specific document.
     * @param {*} collection 
     * @param {*} document 
     * @param {*} query 
     */
    database.update = function(collection, document, query) {
        return new Promise((resolve, reject) => {
            mongodbConnection.collection(collection).replaceOne(query, document, (error, result) => {
                if(error) {
                    logger.log(error);
                    reject(error);
                } else {
                    // todo: What happens if none document was updated?
                    resolve(true);
                }
            });
        });
    }

    /**
     * Returns all documents of a collection that match a given query.
     * @param {*} collection 
     * @param {*} query 
     */
    database.getAll = function(collection, query) {
        return new Promise((resolve, reject) => {
            mongodbConnection.collection(collection).find(query).toArray((error, result) => {
                if(error) {
                    logger.log(error);
                    reject(error);
                } else {
                    resolve(result);    
                }
            });
        });
    }

    /**
     * Returns one specific document of a collection.
     * @param {*} collection 
     * @param {*} query 
     */
    database.getOne = function(collection, query) {
        return new Promise((resolve, reject) => {
            mongodbConnection.collection(collection).findOne(query, (error, result) => {
                if(error) {
                    logger.log(error);
                    reject(error);
                } else {
                    resolve(result);    
                }
            });
        });
    }

    return database;
};