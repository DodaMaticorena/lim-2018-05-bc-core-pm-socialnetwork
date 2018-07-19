global.window = global;
global.assert = require('chai').assert;
global.firebase = require('firebase');
require('../src/js/data');
require('./data.spec.js');
