global.window = global;
global.assert = require('chai').assert;
global.firebase = require('firebase');
const firebaseMock = require('firebase-mock');
global.mocksdk = firebaseMock.MockFirebaseSdk();

firebaseMock.override();

let config = {
    apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
    authDomain: "pet-health-social-network.firebaseapp.com",
    databaseURL: "https://pet-health-social-network.firebaseio.com",
    projectId: "pet-health-social-network",
    storageBucket: "pet-health-social-network.appspot.com",
    messagingSenderId: "838633128523"
};
global.firebase.initializeApp(config);

require('../src/js/data');
require('./data.spec.js');
