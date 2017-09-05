const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
const server = require('http').createServer(app);

server.listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');

app.get('/data', function(req, res) {
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
	const filePath = path.join(__dirname, './app/resource/data.json');
	const readable = fs.createReadStream(filePath);
    readable.pipe(res);
});