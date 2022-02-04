'use strict';

import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { fileURLToPath } from 'url';

import def from './define.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Config {
  constructor(data = {}) {
    this.data = data;
  }

  get(path) {
    return _.isEmpty(path) ? this.data : _.get(this.data, path);
  }
}

console.log(__dirname);
const filePath = path.join(__dirname, def.DEFAULT_CONFIG_NAME);

let config;

try {
  const a = fs.readFileSync(filePath, def.DEFAULT_CONFIG_ENCODING);
  const b = yaml.load(a);
  config = new Config(b);
} catch (err) {
  console.log(`Error with config file: ${filePath}`);
  console.log(`Error: ${err.message}`);
  process.exit(def.EXIT_CODE.ERROR);
}

export {config as default};