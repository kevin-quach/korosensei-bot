var express     = require('express');
var bodyParser  = require('body-parser');
var korosensei  = require('./korosensei.json');

var app = express();
var port = process.env.PORT || 1344;
var responses = korosensei.responses;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.status(200).send('Hello Wurld!'); 
});

app.listen(port,function() {
	console.log('Listening on port' + port);
});


app.post('/hello', function(req,res,next) {
	var username = req.body.user_name,
			trigger = req.body.trigger_word,
			channel = req.body.channel_name,
			botPayload = {};

	for(var i = 0; i < responses.length; i++) {
		if(trigger == responses[i].trigger) {
			botPayload.text = responses[i].message.replace("__", username);
		}
	}

	if(botPayload.text == undefined) {
		botPayload.text = "Sorry " + username + ", seems like something went wrong. :sadkorosensei:";
	}

	if(username !== 'slackbot') {
		return res.status(200).json(botPayload);
	}
	else {
		return res.status(200).end();
	}
});






