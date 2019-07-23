const functions = require('firebase-functions');
const express = require('express');

var admin = require("firebase-admin");

var refreshToken;
// var serviceAccount = require("/Documents/Project/cromosom/functions/abc.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),


    databaseURL: "https://si-istri-cermat.firebaseio.com/"
});
const db = admin.database();

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

app.get('/update/:watt/:ampere/:delay', function (req, res){
  let watt, ampere, delay, waktu;
  watt = req.params.watt;
  ampere = req.params.ampere;
  delay = req.params.delay;

  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours(); // GMT +0
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();

  var dateString = date + "-" +(month + 1) + "-" + year + " " + (hour+8) + ":" + minute +  ":" + second;

  waktu =  dateString;


  db.ref('log/').push({

    waktu: waktu,
    ampere: ampere,
    delay : delay,
    watt : watt
  });

  db.ref('hasil/').set({

    ampere: ampere,
    watt : watt
  });


  res.send("Watt : " + watt + " | Ampere : " + ampere + " | Delay :" + delay + " | Waktu : " + waktu );
});

app.get('/login', function(request, response)  {
  response.render("login", {title : "Login", appName : appName});
});


exports.apps = functions.https.onRequest(app);


