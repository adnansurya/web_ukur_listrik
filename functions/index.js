const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'));

app.get('/', function(request, response)  {
  response.send("mantap");
});

app.get('/kosong', function(request, response)  {
  response.render("blank");
});
exports.apps = functions.https.onRequest(app);
