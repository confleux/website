'use strict';

const def = require('./define.js');
const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

class Config {
  constructor(data = {}) {
    this.data = data;
  }

  get(path) {
    return _.isEmpty(path) ? this.data : _.get(this.data, path);
  }
}

const filePath = path.join(path.basename(__dirname), def.DEFAULT_CONFIG_NAME);

try {
  const a = fs.readFileSync(filePath, def.DEFAULT_CONFIG_ENCODING);
  const b = yaml.load(a);
  module.exports = new Config(b);
} catch (err) {
  console.log(`Error with config file: ${filePath}`);
  console.log(`Error: ${err.message}`);
  process.exit(def.EXIT_CODE.ERROR);
}
