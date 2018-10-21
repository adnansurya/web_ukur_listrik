const functions = require('firebase-functions');
const express = require('express');

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
app.get('/login', function(request, response)  {
  response.render("login", {title : "Login", appName : appName});
});


exports.apps = functions.https.onRequest(app);
