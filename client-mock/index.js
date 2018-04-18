var http    = require('http')
var fs      = require('fs')
var logger  = require('../server/utils/logger')()

var body = fs.readFileSync("mock.json")
var request = null;

function sendRequest() {
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
    setTimeout(sendRequest, 1000);
}

sendRequest();