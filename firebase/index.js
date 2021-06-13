
var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project1-eadb3.firebaseio.com"
});

module.exports = admin;
