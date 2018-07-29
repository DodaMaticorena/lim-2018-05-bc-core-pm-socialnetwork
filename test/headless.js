global.window = global;
global.assert = require('chai').assert;

//global.firebase = require('firebase');

const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth
);

const modelTest = require('./data.spec');

require('../src/js/data');
