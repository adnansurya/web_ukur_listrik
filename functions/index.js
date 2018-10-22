const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const app = express();
const appName = "SI ISTRI CERMAT";

app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'));

app.get('/', function(request, response)  {
  response.render("beranda", {title : "Beranda", appName : appName});
});
app.get('/test', function(request, response)  {
  response.send("ini halaman testing");
});

app.get('/kosong', function(request, response)  {
  response.render("blank", {title : "Blank", appName : appName});
});

app.get('/status', function(request, response)  {
  response.render("status", {title : "Status", appName : appName});
});

app.get('/monitor', function(request, response)  {
  response.render("monitoring", {title : "Monitoring", appName : appName});
});
app.get('/log', function(request, response)  {
  response.render("log", {title : "Log", appName : appName});
});
app.get('/pengaturan', function(request, response)  {
  response.render("pengaturan", {title : "Pengaturan", appName : appName});
});

app.get('/login', function(request, response)  {
  response.render("login", {title : "Login", appName : appName});
});


exports.apps = functions.https.onRequest(app);

// exports.updateHasil = functions.database.ref('/hasil')
//     .onUpdate((snapshot, context) => {
//       // Grab the current value of what was written to the Realtime Database.
//       const original = snapshot.val();
//       console.log('Catat Log', context.params.pushId, original);
//       //const uppercase = original.toUpperCase();
//       return snapshot.ref.parent.child('log').push({
//           watt : original.watt,
//           waktu : original.ampere,
//           tercatat : admin.database.ServerValue.TIMESTAMP
//       });
//
// });
