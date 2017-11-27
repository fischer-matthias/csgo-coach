 const CONFIG = require('./config');

// Default logging function
var _logger = function(message) {
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

module.exports.log = _logger;