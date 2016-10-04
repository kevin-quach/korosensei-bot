var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {res.status(200).send('Hello Wurld!'); })

app.listen(port,function() {
	console.log('Listening on port' + port);
});

app.post('/hello', function(req,res,next) {
	var username = req.body.user_name;
	var botPayload = {
		text: 'Hello' + username + ', my precious student!'
	};

	if(username !== 'slackbot') {
		return res.status(200).json(botPayload);
	}
	else {
		return res.status(200).end();
	}
}