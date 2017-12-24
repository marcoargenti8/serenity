var express = require('express');
var path = require('path');
var email = require('./controllers/mail.js');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Define view engine: EJS templating
app.set('view engine', 'ejs');

// Define the port to run on
app.set('port', process.env.PORT || 3000);

var logUserAccess = function(req) {
	var useragent = req.headers['user-agent'];

	console.log("Accesso Utente req:" + req.path + " da ips: " + req.ips + "; ip: " + req.ip
		+ " ; useragent: " + useragent
		);
};

//redirect HTTP inbound traffic to HTTPS
var redirect = function(req,res) {
	logUserAccess(req);
	if(req.get('X-Forwarded-Proto')=='https' || req.hostname == 'localhost') {
		return false;
	} else if(req.get('X-Forwarded-Proto')!='https' && req.get('X-Forwarded-Port')!='443'){
		var destination = "https://" + req.headers['host'] + req.url;
		console.log("Redirect request to: " + destination);
		res.redirect(destination);
		return true;
	}
	return false;
};

app.get('/', function(req, res) {
	if(!redirect(req, res))
    	res.render('pages/index', {pretitle: "Il Matrimonio di", title: "Claudia & Marco", subtitle:"1 Settembre 2018", home:true});
});

app.get('/wedding', function(req, res) {
	if(!redirect(req, res))
    	res.render('pages/wedding', {pretitle: "", title: "Il Matrimonio", subtitle:"", wedding:true});
});

app.get('/other', function(req, res) {
	if(!redirect(req, res))
    	res.render('pages/other', {pretitle: "", title: "Altro", subtitle:"", other:true});
});

app.get('/faq', function(req, res) {
	if(!redirect(req, res))
    	res.render('pages/faq', {pretitle: "Altro", title: "Domande Frequenti", subtitle:"", other:true, iban: process.env.IBAN});
});


var imagesName = ['v1514040021/gallery/cina.jpg',
	'v1514033583/gallery/acqui_terme.jpg',
	'v1514029058/gallery/bowling.jpg',
	'v1514033462/gallery/canada_auto.jpg',
	'v1514033548/gallery/canada_cascata.jpg',
	'v1514033595/gallery/castello_romania.jpg',
	'v1514029206/gallery/cena_gala.jpg',
	'v1514033578/gallery/cena_maldive2.jpg',
	'v1514033538/gallery/con_le_mamme.jpg',
	'v1514033650/gallery/corea_sud.jpg',
	'v1514033542/gallery/laurea_claudia.jpg',
	'v1514033579/gallery/mosca.jpg',
	'v1514040186/gallery/cina2.jpg',
	'v1514033565/gallery/niagara.jpg',
	'v1514033589/gallery/russia.jpg',
	'v1514033671/gallery/seul.jpg',
	'v1514033672/gallery/sirmione.jpg',
	'v1514033673/gallery/skyline_canada.jpg',
	'v1514033617/gallery/terme_eugane.jpg',
	'v1514029182/gallery/torino.jpg',
	'v1514033619/gallery/venezia.jpg'];

app.get('/gallery', function(req, res) {
    res.render('pages/gallery', {pretitle: "La Galleria", title: "delle Foto degli Sposi", 
    	subtitle: "", imagePath: ""+process.env.CLOUDINARY_URL_IMG, images: imagesName, gallery: true});
});

app.get('/download/map', function(req, res) {
	var file = 'pdf/map.pdf';
	res.download(file);
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
