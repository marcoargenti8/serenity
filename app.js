var express = require('express');
var path = require('path');
var app = express();

// Define view engine: EJS templating
app.set('view engine', 'ejs');

// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.render('pages/index', {pretitle: "Il Matrimonio di", title: "Claudia & Marco", subtitle:"1 Settembre 2018", home:true});
});

app.get('/wedding', function(req, res) {
    res.render('pages/wedding', {pretitle: "", title: "Il Matrimonio", subtitle:"", wedding:true});
});

app.get('/other', function(req, res) {
    res.render('pages/other', {pretitle: "", title: "Altro", subtitle:"", other:true});
});

app.get('/faq', function(req, res) {
    res.render('pages/faq', {pretitle: "Altro", title: "Domande Frequenti", subtitle:"", other:true});
});

app.get('/gallery', function(req, res) {
    res.render('pages/gallery', {pretitle: "La Gallery", title: "delle Foto degli Sposi", subtitle:"", gallery:true});
});

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});