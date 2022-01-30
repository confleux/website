'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./lib/config.js');

const app = express();

const port = config.get('publicServerOptions').port;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

https.createServer({
      key: fs.readFileSync(path.join(__dirname, config.get('privateServerOptions').sslKeyFilename)),
      cert: fs.readFileSync(path.join(config.get('privateServerOptions').sslCertFilename))
    },
    app
  )
  .listen(port, () => {
    console.log(`App started on port ${port}`);
  });
