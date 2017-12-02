var mailgun = require('mailgun.js');

var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
var domain = process.env.MAILGUN_DOMAIN;
var mail_to = process.env.MAIL_TO;
var mail_from = process.env.MAIL_FROM;

exports.sendEmail = function(name, email, msg) {
	console.log("Sending email - name:" + name + "<"+email+">  messaggio:" +msg);
	return mg.messages.create(domain, {
	    from: mail_from,
	    to: mail_to.split(";"),
	    subject: "[MATRIMONIO] Comunicazione da " + name + " <"+ email +">",
	    text: "Il messaggio di " + name + " <" +email +">:\n" + msg
  });
}
