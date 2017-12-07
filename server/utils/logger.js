module.exports = function() {
    const CONFIG = require('../config');

    var logger = {};

    // Default logging function
    logger.log = function(message) {
        if(CONFIG.LOGGING_ENABLED) {

            var currentDate = new Date();

            var currentTimeStamp = currentDate.getDate() + '/'
                + (currentDate.getMonth()+1)  + '/'
                + currentDate.getFullYear() + ' @ '
                + currentDate.getHours() + ':'
                + currentDate.getMinutes() + ':'
                + currentDate.getSeconds();

            console.log(currentTimeStamp + ': ' + message);
        }
    };

    return logger;
};
