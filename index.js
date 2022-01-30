const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 443;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
  },
  app
  )
  .listen(port, () => {
    console.log(`App started on port ${port}`);
  });
