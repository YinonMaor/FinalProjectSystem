/**
 * Created by yinonc on 18/12/2017.
 */
'use strict'

let http = require('http');
let fs = require('fs');

let PORT = 80;
let ip = "127.0.0.1";
let path = "/";

process.argv.forEach(function (val, index, array) {
    if (val === '-t') {
        ip = array[index + 1];
    }
    else if (val === '-p') {
        PORT = parseInt(array[index + 1]);
    }
    else if (val === '-f') {
        path = array[index + 1];
    }
});

const amount = 1;

let options = {
    hostname: ip,
    port: PORT,
    path: path,
    method: "GET"
};

let count = 0;
for (let i = 0; i < amount; i++) {
    let req = http.request(options, function (res) {
        let responseBody = "";
        res.on("data", function (chunk) {
            //console.log(`--chunk-- ${chunk.length}`);
            responseBody += chunk;
        });
        res.on("end", function () {
            fs.writeFile(i + ".html", responseBody, function (err) {
                if (err) {
                    throw err;
                } else {
                    count++;
                }
            });
        });
    });
    req.on("error", function (err) {
        console.log(`problem with request: ${err}`);
    });
    req.end();
}