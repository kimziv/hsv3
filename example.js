'use strict';

const path = require('path');
const { tmpdir } = require('os');
const { createServer } = require('http');
const { readFileSync } = require('fs');
const mkdirp = require('mkdirp');
const hsv3 = require('./index'); // require('hsv3');


const dataDirectory = path.join(tmpdir(), 'hsv3-example');
const server = createServer((req, res) => res.end('hello hsv3!'));

server.listen(8099);

const tor = hsv3([
  {
    dataDirectory,
    virtualPort: 80,
    localMapping: '127.0.0.1:8099'
  }
]);

tor.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

tor.on('ready', () => {
  console.info('hidden service v3 established',
    readFileSync(path.join(dataDirectory, 'hostname')).toString());
});