'use strict';

import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  console.log(`https started on port ${httpsPort}`);
});

http.createServer(app).listen(httpPort, () => {
  console.log(`http started on port ${httpPort}`);
});
