var http    = require('http')
var fs      = require('fs')
var logger  = require('../server/utils/logger')()

var body_76561198831056684 = null;
var request_76561198831056684 = null;

var body_76561198035577428 = null;
var request_76561198035577428 = null;

const users = ["76561198831056684", "76561198035577428"];

body_76561198831056684 = fs.readFileSync("mock_76561198831056684.json");
body_76561198035577428 = fs.readFileSync("mock_76561198035577428.json");

function sendRequest() {
    
    request_76561198831056684 = new http.ClientRequest({
        hostname: "localhost",
        port: 4200,
        path: "/api/csgo",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body_76561198831056684)
        }
    });
    
    request_76561198831056684.end(body_76561198831056684);
    logger.log("request_76561198831056684 sent.");


    request_76561198035577428 = new http.ClientRequest({
        hostname: "localhost",
        port: 4200,
        path: "/api/csgo",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body_76561198035577428)
        }
    });
    
    request_76561198035577428.end(body_76561198035577428);
    logger.log("request_76561198035577428 sent.");

    setTimeout(sendRequest, 5000);
}

sendRequest();