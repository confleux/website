'use strict';

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./lib/config.js');

const app = express();

const httpsPort = config.get('publicServerOptions').httpsPort;
const httpPort = config.get('publicServerOptions').httpPort;

const options = {
  key: fs.readFileSync(path.join(__dirname, config.get('privateServerOptions').sslKeyFilename)),
  cert: fs.readFileSync(path.join(__dirname, config.get('privateServerOptions').sslCertFilename))
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

https.createServer(options, app).listen(httpsPort, () => {
    console.log(`App https started on port ${httpsPort}`);
});

http.createServer(options, app).listen(httpPort, () => {
    console.log(`App http started on port ${httpPort}`);
});
