var http    = require('http')
var fs      = require('fs')
var logger  = require('../server/utils/logger')()

var body = null;
var request = null;

function sendRequest() {
    
    body = fs.readFileSync("mock.json");
    request = new http.ClientRequest({
        hostname: "localhost",
        port: 4200,
        path: "/api/csgo",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }
    });
    
    request.end(body);
    logger.log("Request sent.")
    setTimeout(sendRequest, 5000);
}

sendRequest();