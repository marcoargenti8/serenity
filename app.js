var express = require('express');
var path = require('path');
var email = require('./controllers/mail.js');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

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
    res.render('pages/gallery', {pretitle: "La Galleria", title: "delle Foto degli Sposi", subtitle:"", gallery:true});
});

app.post('/submit/mail', function(req,res) {
	req.checkBody('name', 'Invalid name').notEmpty();
	req.checkBody('email', 'Invalid email').notEmpty();
	req.checkBody('message', 'Invalid message').notEmpty();

	req.sanitize('name').escape();
	req.sanitize('email').escape();

	email.sendEmail(req.body.name, req.body.email, req.body.message)
		.then(msg => {
			res.send({sent: true});
		})
		.catch(err => {
			res.send({sent: false});
		});
});


app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

//redirect all HTTP inbound traffic to HTTPS
var httpApp = express();
var httpRouter = express.Router();
httpApp.use('*', httpRouter);
httpRouter.get('*', function(req, res){
    var host = req.get('Host');
    host = host.replace(/:\d+$/, ":"+app.get('port'));
    var destination = ['https://', host, req.url].join('');
    return res.redirect(destination);
});
var httpServer = http.createServer(httpApp);
httpServer.listen(8080);