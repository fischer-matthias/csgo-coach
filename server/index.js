const webServer = require('./web-server/webServer')();
const database = require('./utils/database')();

// Start web-server
webServer.init();