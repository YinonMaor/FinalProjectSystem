/**
 * Created by yinonc on 18/12/2017.
 */
'use strict'

let http = require('http');
let fs = require('fs');
let path = require('path');

const PORT = 4400;
let address = "127.0.0.1";


let server = http.createServer(function (req, res) {
    console.log(`${req.method} request for ${req.url}`);
    console.log(req.connection.remoteAddress);

    if (req.url === '/') {
        fs.readFile('./index.html', function(err,data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if (req.url.match(/.jpg$/)) {
        let imgPath = path.join(__dirname, 'images', req.url);
        let imgStream = fs.createReadStream(imgPath);

        res.writeHead(200, {'Content-Type': 'image/jpeg'});

        imgStream.pipe(res);
    }
    else if (req.url.match(/.png$/)) {
        let imgPath = path.join(__dirname, 'images', req.url);
        let imgStream = fs.createReadStream(imgPath);

        res.writeHead(200, {'Content-Type': 'image/png'});

        imgStream.pipe(res);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 File Not Found");
    }
});
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    address = add;
    server.listen(PORT, address);
    console.log(`Server is running on ip ${address}, port ${PORT}.`);
});


